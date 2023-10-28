import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";

export default function TabelaEmprestimos() {
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [prazoDevolucao, setPrazoDevolucao] = useState(15);

  // Função para carregar dados de usuários, livros e empréstimos

  const url = "http://localhost:4040" //para local
  //const url = "http://129.146.68.51/aluno40-pfsii" //para infra

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
  const dataFormatada = (data)=>{
    //transforma data no tipo Date
    let aux = new Date(data)
    //Converte resultado do [getDate, getMonth] para string e faz um if (?) else (:) se o tamanho da string 
    //for menor que 2 coloca o zero na frente se não envia normal o valor 
    let dia = String(aux.getDate()).length < 2 ? "0" + String(aux.getDate()):String(aux.getDate())
    let mes = String(aux.getMonth()).length < 2 ? "0" + String(aux.getMonth()):String(aux.getMonth())
    let ano = aux.getFullYear()
    return `${dia}/${mes}/${ano}`
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const registrarDevolucao = (id) => {
//   // Lógica para registrar a devolução de um empréstimo
//   const updatedEmprestimos = emprestimos.map((emprestimo) => {
//     if (emprestimo.id === id) {
//       emprestimo.renovacao = "Devolução Efetivada";
//     }
//     return emprestimo;
//   });
//   setEmprestimos(updatedEmprestimos);
// };

// const solicitarRenovacao = (id) => {
//   // Lógica para solicitar a renovação de um empréstimo
//   const updatedEmprestimos = emprestimos.map((emprestimo) => {
//     if (emprestimo.id === id) {
//       emprestimo.renovacao = "Renovação Solicitada";
//     }
//     return emprestimo;
//   });
//   setEmprestimos(updatedEmprestimos);
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <div className="shadow p-3 mb-5 bg-white rounded container mt-3">
        <div className="d-flex">
          <Form className="d-flex mb-3 pb-1 m-1">
            <Form.Control
              className="form-control"
              placeholder="Pesquisar Usuário"
              type="search"
              id="example-search-input"
            />
          </Form>
        </div>
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
          <Button  className="mb-5 " variant="success" type="submit"  >
            Registrar Empréstimo
          </Button>
        </Form>
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
                      {/* <td>{emprestimo.renovacao}</td>
                      <td>
                          {emprestimo.renovacao === "Renovação Solicitada" ? (
                            <Button variant="secondary" >
                              Renovação
                            </Button>
                          ) : (
                            <Button
                              variant="info"
                              onClick={() => solicitarRenovacao(emprestimo.id)}
                            >
                              Solicitar Renovação
                            </Button>
                          )}
                          {emprestimo.renovacao === "Devolução Efetivada" ? (
                            <Button variant="success" disabled>
                              Devolução
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              onClick={() => registrarDevolucao(emprestimo.id)}
                            >
                              Registrar Devolução
                            </Button>
                          )}
                </td> */}
                    </tr>
                ))}
         </tbody>
        </Table>
        {/* linha onde ficava formulário de empréstimo em código original */}
      </div>
    </Container>
  );
}