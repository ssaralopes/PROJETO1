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

  //const url = "http://localhost:4040" //para local
  const url = "http://129.146.68.51/aluno40-pfsii" //para infra

  useEffect(() => {
    axios.get(url+"/usuarios").then((res) => {
      setUsuarios(res.data);
    });

    axios.get(url+"/livros").then((res) => {
      setLivros(res.data);
    });

    axios.get(url+"/emprestimos").then((res) => {
      setEmprestimos(res.data);
    });
  }, []);

  // Função para registrar um empréstimo
const postData = (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
  
    if (usuarioSelecionado && livroSelecionado && dataEmprestimo) {
      const dataDevolucao = new Date(dataEmprestimo);
      dataDevolucao.setDate(dataDevolucao.getDate() + prazoDevolucao);
  
      axios
        .post(url+'/emprestimos', {
          id_usuario: usuarioSelecionado,
          id_livro: livroSelecionado,
          data_emprestimo: dataEmprestimo,
          data_devolucao: dataDevolucao.toISOString(),
          renovacao: false
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
  
          // Verifique se o status da resposta indica sucesso (código 201)
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
        <Table className="table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Livro</th>
              <th>Data Empréstimo</th>
              <th>Data Devolução</th>
            </tr>
          </thead>
          <tbody>
                {emprestimos.map((emprestimo, id) => (
                    <tr key={id}>
                    <td>{emprestimo.nome_usuario}</td>
                    <td>{emprestimo.nome_livro}</td>
                    <td>{emprestimo.data_emprestimo}</td>
                    <td>{emprestimo.data_devolucao}</td>
                    </tr>
                ))}
         </tbody>
        </Table>
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
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Registrar Empréstimo
          </Button>
        </Form>
      </div>
    </Container>
  );
}