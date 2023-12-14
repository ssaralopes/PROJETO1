import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function TabelaLivros() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4040/livros')
      .then(res => {
        setRecords(res.data)
      });

  }, []);

  const gerarRelatorio = () => {
    const dataRelatorio = records.map((livro) => ({
      ISBN: livro.idlivros,
      Titulo: livro.titulo,
      Autor: livro.autor,
      Publicacao: livro.publicado,
      Localizacao: livro.local,
      Material: livro.material,
      Idioma: livro.idioma,
      Original: livro.original,
    }));

    const documentoPDF = {
      content: [
        {
          text: "Relatório de Livros",
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

  const Filtro = (event) => {
    setRecords(records.filter((livro) => livro.titulo.toLowerCase().includes(event.target.value)));
  };

  const [helpModalShow, setHelpModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);

  return (
    <Container>
      <div className="shadow p-3 mb-5 bg-white rounded container mt-3">
        <div className="">
          <Link to="/CadastroLivro" className="btn mb-3  text-white pb-1 m-3"
            style={{ bottom: "20px", right: "20px", background: "#8b34a9" }}
          >
            Novo cadastro
          </Link>
          <Link to="/Categorias" className="btn  mb-3  text-white pb-1 m-3"
            style={{ bottom: "20px", right: "20px", background: "#660066" }}
          >
            Categorias
          </Link>
          <Form className="d-flex mb-1 mt-1 pb-1">
            <Form.Control onChange={Filtro} className="form-control m-3  d-flex" placeholder="Pesquisar Exemplar" type="search" id="example-search-input" />
          </Form>

        </div>
        <Table className="table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Publicação</th>
              <th>Localização</th>
              <th>Material</th>
              <th>Idioma</th>
              <th>Original</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {records.map((livro, idlivros) => (
              <tr key={idlivros}>
                <td>{livro.idlivros}</td>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.publicado}</td>
                <td>{livro.local}</td>
                <td>{livro.material}</td>
                <td>{livro.idioma}</td>
                <td>{livro.original}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to={`/editarLivro/${livro.idlivros}`} className="btn btn-sm btn-success m-3 pb-1">
                      Atualizar
                    </Link>
                  </div>
                </td>
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
              1. Para pesquisar as informações de um Livro cadastrado:
            </b>
            <p>Utilize a barra de pesquisa informando o nome do Livro</p>

            <b>
              2. Para cadastrar um novo livro a tabela de Livros:
            </b>
            <p>Clique no botão "Novo Cadastro" para ser redirecionado a tela onde um novo registro será efetivado.</p>
            <b>
              3. Para atualizar as informações de um livro já registrado:
            </b>
            <p>Clique no botão "Atualizar" na tabela selecionando a linha correspondente, para ser redirecionado a tela onde a atualização de um registro poderá ter suas informações atualizadas.</p>
            <b>
              4. Para ser direcionado a tabela Categorias.
            </b>
            <p>Clique no botão "Categorias" para ser redirecionado a tela de gerencimento de categorias.</p>
            <p>A tela destinada as categorias é a interface projetada para gerenciar categorias associadas aos livros dentro do sistema.</p>
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
          {/* Adicione o ícone desejado, por exemplo: */}
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
