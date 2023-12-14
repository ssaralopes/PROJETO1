import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function TabelaEmprestimos() {
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [prazoDevolucao,] = useState(15);
  // setPrazoDevolucao

  const gerarRelatorio = () => {
    const dataRelatorio = emprestimos.map((emprestimo) => ({
      Usuario: emprestimo.nome_usuario,
      Livro: emprestimo.nome_livro,
      "Data Empréstimo": dataFormatada(emprestimo.data_emprestimo),
      "Data Devolução": dataFormatada(emprestimo.data_devolucao),
    }));

    const documentoPDF = {
      content: [
        {
          text: "Relatório de Empréstimos",
          style: "header",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            body: [
              Object.keys(dataRelatorio[0]),
              ...dataRelatorio.map((row) => Object.values(row)),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(documentoPDF).open();
  };

  // Função para carregar dados de usuários, livros e empréstimos

  const url = "http://localhost:4040" //para local


  useEffect(() => {
    axios.get(url + "/usuarios").then((res) => {
      setUsuarios(res.data);
    });

    axios.get(url + "/livros").then((res) => {
      setLivros(res.data);
    });

    axios.get(url + "/emprestimos").then((res) => {
      setEmprestimos(res.data);
    });
  }, [emprestimos]); // Adicione 'emprestimos' como dependência

  // Função para registrar um empréstimo
  const postData = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    if (usuarioSelecionado && livroSelecionado && dataEmprestimo) {
      const dataDevolucao = new Date(dataEmprestimo);
      dataDevolucao.setDate(dataDevolucao.getDate() + prazoDevolucao);

      axios
        .post(url + "/emprestimos", {
          id_usuario: usuarioSelecionado,
          id_livro: livroSelecionado,
          data_emprestimo: dataEmprestimo,
          data_devolucao: dataDevolucao.toISOString(),
          renovacao: false,
        })
        .then((response) => {
          if (response.status === 201) {
            // Atualize o estado apenas se o registro for bem-sucedido
            setEmprestimos([...emprestimos, response.data]);
            setUsuarioSelecionado("");
            setLivroSelecionado("");
            setDataEmprestimo("");
            alert("Dados enviados com sucesso!");
          } else {
            console.error("Falha ao registrar empréstimo. Status: ", response.status);
          }
        })
        .catch((error) => {
          console.error("Erro ao registrar empréstimo:", error);
        });
    }
  };
  const dataFormatada = (data) => {
    //transforma data no tipo Date
    let aux = new Date(data)
    //Converte resultado do [getDate, getMonth] para string e faz um if (?) else (:) se o tamanho da string 
    //for menor que 2 coloca o zero na frente se não envia normal o valor 
    let dia = String(aux.getDate()).length < 2 ? "0" + String(aux.getDate()) : String(aux.getDate())
    let mes = String(aux.getMonth()).length < 2 ? "0" + String(aux.getMonth()) : String(aux.getMonth())
    let ano = aux.getFullYear()
    return `${dia}/${mes}/${ano}`
  }
  // const Filtro = (event) => {
  //   setEmprestimos(
  //     emprestimos.filter((emprestimo) =>
  //       emprestimo.nome_usuario.toLowerCase().includes(event.target.value.toLowerCase())
  //     )
  //   );
  // };


  const [helpModalShow, setHelpModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  return (
    <Container>
      <div className="shadow p-3 mb-5 bg-white rounded container mt-3">
        <h5>Lançar um novo Empréstimo:</h5>
        <Form onSubmit={postData}>
          <Form.Group controlId="formUsuario">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              as="select"
              value={usuarioSelecionado}
              onChange={(e) => setUsuarioSelecionado(e.target.value)}
            >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formLivro">
            <Form.Label>Livro</Form.Label>
            <Form.Control
              as="select"
              value={livroSelecionado}
              onChange={(e) => setLivroSelecionado(e.target.value)}
            >
              <option value="">Selecione um livro</option>
              {livros.map((livro) => (
                <option key={livro.idlivros} value={livro.idlivros}>
                  {livro.titulo}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDataEmprestimo">
            <Form.Label>Data Empréstimo</Form.Label>
            <Form.Control
              type="date"
              value={dataEmprestimo}
              onChange={(e) => setDataEmprestimo(e.target.value)}
              className="mb-3"
            />
          </Form.Group>
          <Button className="mb-5 " variant="success" type="submit"  >
            Registrar Empréstimo
          </Button>
        </Form>
        <div className="">
          {/* <h6>Pesquisar Empréstimos de um usuário:</h6>
          <Form className="d-flex mb-3 pb-1 m-1">
            <Form.Control
              className="form-control"
              placeholder="Pesquisar Usuário"
              type="search"
              onChange={Filtro}
              id="example-search-input"
            />
          </Form> */}
        </div>
        <Table className="table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Livro</th>
              <th>Data Empréstimo</th>
              <th>Data Devolução</th>
              {/* <th>Status Devolução</th>
              <th>Ações</th> */}
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((emprestimo, id) => (
              <tr key={id}>
                <td>{emprestimo.nome_usuario}</td>
                <td>{emprestimo.nome_livro}</td>
                <td>{dataFormatada(emprestimo.data_emprestimo)}</td>
                <td>{dataFormatada(emprestimo.data_devolucao)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="light"
          className="rounded-circle p-2 position-fixed text-white"
          style={{ bottom: "20px", right: "20px", background: "#72ECAA" }}
          onClick={() => setHelpModalShow(true)}
        >
          <BsQuestionCircle size={30} />
        </Button>

        {/* Modal de Ajuda */}
        <Modal show={helpModalShow} onHide={() => setHelpModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ajuda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Conteúdo da área de ajuda */}
            <b>
              1. Para registrar um novo empréstimo:
            </b>
            <p>Selecione o Usuário e o Livro que deseja lançar o Empréstimo;</p>
            <p>Informe a data em que está sendo lançado o Empréstimo;</p>
            <p>Clique no botão "Registrar Empréstimo" para efetivar o registro.</p>
            <b>
              2. Como funciona a data de Devolução?
            </b>
            <p>Após a data ser fornecida no ato do registro do Empréstimo, o sistema gera automaticamente a data em que deverá ser efetuada a renovação. </p>
            {/* Adicione mais informações ou instruções conforme necessário */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setHelpModalShow(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Botão de relatórios e visualização */}
        <Button
          variant="light"
          className="rounded-circle p-2 position-fixed text-white"
          style={{ bottom: "20px", left: "20px", background: "#a64ca6" }}
          onClick={() => setReportModalShow(true)}
        >
          {/* adicionando o icone: */}
          <BsFileEarmarkText size={30} />
        </Button>
        {/* Modal para Emissão de Relatórios e Visualização */}
        <Modal show={reportModalShow} onHide={() => setReportModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Relatórios e Visualização</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Bem-vindo à seção de relatórios e visualização. Aqui, você pode gerar relatórios e visualizar informações essenciais do sistema DIGITECA.
            </p>
            <Button variant="light" 
                    className="mr-2 text-white" 
                    style={{ background: "#5dddd0" }}
                    onClick={gerarRelatorio}
                    
            >
              Emitir Relatórios
            </Button>
            <Button variant="light" 
                    className="mr-2 m-2 pb-1 text-white" 
                    style={{ background: "#874a97" }}
                    onClick={() => alert("Visualizando informações...")}
            >
              Visualizar Informações
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReportModalShow(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}