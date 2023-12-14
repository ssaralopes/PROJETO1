import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function TabelaCategorias() {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [cadastroModalShow, setCadastroModalShow] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [descricaoCategoria, setDescricaoCategoria] = useState("");
  const [helpModalShow, setHelpModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [lancarCategoriasModalShow, setLancarCategoriasModalShow] = useState(false);
  const [livroSelecionadoId, setLivroSelecionadoId] = useState("");

  // Função para salvar a nova categoria
  const salvarNovaCategoria = async () => {
    try {
      // Enviar os dados ao servidor para salvar a nova categoria
      await axios.post("http://localhost:4040/categorias", {
        nome: nomeCategoria,
        descricao: descricaoCategoria,
      });

      // Atualizar a lista de categorias após o salvamento bem-sucedido
      carregarCategorias();

      // Fechar o modal de cadastro de categorias
      setCadastroModalShow(false);

      // Limpar os campos do formulário
      setNomeCategoria("");
      setDescricaoCategoria("");
    } catch (error) {
      console.error("Erro ao salvar nova categoria:", error);

    }
  };

  const gerarRelatorio = async () => {
    try {
      const livrosResponse = await axios.get("http://localhost:4040/livros");
      const categoriasResponse = await axios.get("http://localhost:4040/categorias");

      const livros = livrosResponse.data;
      const categorias = categoriasResponse.data;

      const dataRelatorioLivros = livros.map((livro) => ({
        Título: livro.titulo,
        Categorias: livro.categorias ? livro.categorias.split(',').map((categoria) => categoria.trim()) : [],
      }));

      const categoriasTable = categorias.map((categoria) => [categoria.nome, categoria.descricao]);

      const documentoPDF = {
        content: [
          {
            text: "Relatório de Categorias e Livros",
            style: "header",
          },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              body: [Object.keys(dataRelatorioLivros[0]), ...dataRelatorioLivros.map((row) => Object.values(row))],
            },
          },
          {
            text: "Lista de Categorias",
            style: "header",
          },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              body: [["Nome", "Descrição"], ...categoriasTable],
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
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  };

  useEffect(() => {
    carregarLivros();
    carregarCategorias();
  }, []);

  const carregarLivros = async () => {
    try {
      const response = await axios.get("http://localhost:4040/livros");
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  };

  const carregarCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:4040/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };



  const handleModalClose = () => {
    resetModalState();
    setModalShow(false);
  };
  const resetModalState = () => {
    setLivroSelecionado(null);
    setCategoriasSelecionadas([]);
  };

  const lancarCategorias = async () => {
    try {
      console.log('livroSelecionado:', livroSelecionado);
      console.log('categoriasSelecionadas:', categoriasSelecionadas);

      if (!livroSelecionadoId || categoriasSelecionadas.length === 0) {
        alert('Selecione um livro e pelo menos uma categoria antes de associar.');
        return;
      }

      const idlivros = livroSelecionadoId;
      const categorias = categoriasSelecionadas.map((categoria) => categoria.id);

      // Faz a requisição para associar categorias ao livro
      await axios.post(`http://localhost:4040/livros/${idlivros}/associar-categoria`, {
        categorias,
      });

      // Atualiza a lista de livros após a associação bem-sucedida
      carregarLivros();
      handleModalClose();
    } catch (error) {
      console.error('Erro ao associar categorias ao livro:', error);
      // Adicione lógica de tratamento de erro conforme necessário
    }
  };


  return (
    <Container>

      <div className="shadow p-3 mb-5 bg-white rounded container mt-3 position-relative">
        <div className="d-flex justify-content-end">
          <Button
            variant="light"
            className="m-3 text-white"
            style={{ background: "#590059" }}
            onClick={() => setCadastroModalShow(true)}
          >
            Nova Categoria
          </Button>

          <Button
            variant="light"
            className="m-3 text-white"
            style={{ background: "#590059" }}
            onClick={() => setLancarCategoriasModalShow(true)}
          >
            Lançar Categorias
          </Button>
        </div>


        <Modal show={cadastroModalShow} onHide={() => setCadastroModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Nova Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNomeCategoria">
                <Form.Label>Nome da Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da categoria"
                  value={nomeCategoria}
                  onChange={(e) => setNomeCategoria(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescricaoCategoria">
                <Form.Label>Descrição da Categoria</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite a descrição da categoria"
                  value={descricaoCategoria}
                  onChange={(e) => setDescricaoCategoria(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCadastroModalShow(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={salvarNovaCategoria}>
              Salvar Categoria
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={lancarCategoriasModalShow} onHide={() => setLancarCategoriasModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Lançar Categorias</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLivroCategoria">
                <Form.Label>Selecione o Livro:</Form.Label>
                <Form.Control as="select" onChange={(e) => setLivroSelecionadoId(e.target.value)}>
                  <option value="">Selecione um livro</option>
                  {livros.map((livro) => (
                    <option key={livro.idlivros} value={livro.idlivros}>
                      {livro.titulo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCategoria">
                <Form.Label>Selecione a Categoria:</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={categoriasSelecionadas.map((categoria) => categoria.id)}
                  onChange={(e) => {
                    const selectedIds = Array.from(e.target.selectedOptions, (option) => Number(option.value));
                    const selectedCategorias = categorias.filter((categoria) => selectedIds.includes(categoria.id));
                    setCategoriasSelecionadas(selectedCategorias);
                  }}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setLancarCategoriasModalShow(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={lancarCategorias} >
              Lançar Categorias
            </Button>
          </Modal.Footer>
        </Modal>


        <div>
          <h2>Lista de Livros</h2>
          <Table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categorias</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <tr key={livro.idlivros}>
                  <td>{livro.titulo}</td>
                  <td>
                    {livro.categorias ? (
                      livro.categorias.split(',').map((categoria, index) => (
                        <span key={index}>{categoria.trim()}, </span>
                      ))
                    ) : (
                      <span>Sem categorias</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="light"
                      style={{ bottom: "20px", right: "20px", background: "#40c095" }}
                      className="text-white"
                      onClick={() => {
                        setLivroSelecionado(livro);
                        setCategoriasSelecionadas(livro.categorias ? livro.categorias.split(',').map((categoria) => ({ nome: categoria.trim() })) : []);
                        setModalShow(true);
                      }}
                    >
                      Vizualizar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={modalShow} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes de Categorias Associadas </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {livroSelecionado && livroSelecionado.categorias ? (
                <div>
                  <h5>Categorias Associadas:</h5>
                  {livroSelecionado.categorias.split(',').map((categoria, index) => {
                    const categoriaEncontrada = categorias.find((c) => c.nome.trim() === categoria.trim());
                    return (
                      <div key={index}>
                        <strong>{categoria.trim()}</strong> - {categoriaEncontrada ? categoriaEncontrada.descricao : 'Sem descrição'}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>Sem categorias associadas</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Fechar
              </Button>
              {/* Adapte a função associarCategoriaLivro conforme necessário
              <Button variant="primary" onClick={associarCategoriaLivro}>
                Salvar Categorias
              </Button> */}
            </Modal.Footer>
          </Modal>

        </div>


        <Button
          variant="light"
          className="rounded-circle p-2 position-fixed text-white"
          style={{ bottom: "20px", right: "20px", background: "#72ECAA" }}
          onClick={() => setHelpModalShow(true)}
        >
          <BsQuestionCircle size={30} />
        </Button>

        <Modal show={modalShow} onHide={handleModalClose}>
        </Modal>

        {/* Modal de Ajuda */}
        <Modal show={helpModalShow} onHide={() => setHelpModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ajuda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Conteúdo da área de ajuda */}
            <b>
              Esta página fornece aos usuários a capacidade de visualizar e adicionar novas e(ou) categorias vinculadas a diversos livros cadastrados no sistema.
            </b>
            <p></p>
            <b>
              Para cadastrar um novo tipo de Categoria no Sistema, siga os seguintes passos:
            </b>
            <p>1. Clique no botão "Nova Categoria" para abrir a tela de cadastro;</p>
            <p>2. Adicione nos campos respectivos, Nome e Descrição da categoria que deseja cadastrar;</p>
            <p>3. Salve as informações utilizando o botão "Salvar Categoria".</p>
            <b>
              Para associar uma nova categoria aos livros cadastrados no sistema, siga os seguintes passos:
            </b>
            <p>
              1. Selecione um livro na tabela clicando na linha correspondente.
            </p>
            <p>
              2. Clique no botão "Adicionar Categorias" para associar categorias a esse livro.
            </p>
            <p>
              3. No modal que aparecerá, escolha as categorias desejadas na lista e clique em "Salvar Categorias".
            </p>
            <p>
              4. As categorias associadas ao livro serão atualizadas.
            </p>
            {/* Adicione mais informações ou instruções conforme necessário */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setHelpModalShow(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <Link to="/Livro" className="mb-3 btn btn-secondary pb-1 m-1">
              Voltar
            </Link>
          </Col>
        </Row>
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
