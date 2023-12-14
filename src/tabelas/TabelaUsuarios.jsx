import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";
import {BsFileEarmarkText} from "react-icons/bs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function TabelaUsuarios() {
    const url = "http://localhost:4040" //para local

    // 4- Depois você criou essa função para buscar os dados la na url jason-server com o nome parrado como parâmetro

    // 3- Depois você criou essa função onDelete para exclusão 
    //    do usuário dnetro da tabela de gerenciamento.
  const onDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário do Sistema?")) {
      axios.delete(`${url}/usuarios/${id}`)
        .then(res => {
                console.log(res);
                console.log(res.data);
                alert("usuárioexcluído do banco de dados! ");
            }).catch(err => console.log(err));
    }};


    // 2- depois de criar o useEfect, criou essas duas variaveis aqui
    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])



    // 1- primeiro você criou isso aqui que é o que vai buscar os dados lá na url do json-server
    useEffect(() => {
        axios.get(url + '/usuarios')
            .then(res => {
                setColumns(Object.keys(res.data[0]))
                setRecords(res.data)
            })
    }, [])

    const gerarRelatorio = () => {
        const dataRelatorio = records.map((usuario) => ({
          ID: usuario.id,
          Nome: usuario.nome,
          CPF: usuario.cpf,
          RG: usuario.rg,
          Email: usuario.email,
          Endereco: usuario.endereco,
        }));
    
        const documentoPDF = {
          content: [
            {
              text: "Relatório de Usuários",
              style: "header",
            },
            {
              style: "tableExample",
              table: {
                headerRows: 1,
                body: [Object.keys(dataRelatorio[0]), ...dataRelatorio.map((row) => Object.values(row))],
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
    
    // FUNÇÃO DE FILTRO PARA USUÁRIOS
    const Filtro = (event) => {
        setRecords(records.filter(f => f.nome.toLowerCase().includes(event.target.value)))
    }
    const [helpModalShow, setHelpModalShow] = useState(false);
    const [reportModalShow, setReportModalShow] = useState(false);
    return (
        <Container>
            <div className="shadow p-3 mb-5 bg-white rounded container mt-3">

                <Form className="d-flex mb-1 mt-1 pb-1">
                    <Form.Control onChange={Filtro} className="form-control  d-flex m-3" placeholder="Digite o nome do Usuário para obter informações de registro" type="search" id="example-search-input" />
                </Form>

                <Table className="table">
                    <thead>
                        <tr>
                            {columns.map((c, id) => (
                                <th key={id}>{c}</th>

                            ))}
                        </tr>

                    </thead>
                    <tbody>
                        {
                            records.map((d, id) => (
                                <tr key={id}>
                                    <td>{d.id}</td>
                                    <td>{d.nome}</td>
                                    <td>{d.cpf}</td>
                                    <td>{d.rg}</td>
                                    <td>{d.email}</td>
                                    <td>{d.endereco}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Link to={`/editarUsuario/${d.id}`} className="btn btn-sm btn-success m-3 pb-1">Editar</Link>
                                            <Link onClick={() => onDelete(d.id)} className="btn btn-sm  btn-danger m-3 pb-1">Excluir</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
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
                            1. Para pesquisar as informações de um usuário registrado:
                        </b>
                        <p>Utilize a barra de pesquisa informando o nome do usuário</p>

                        <b>
                            2. Para atualizar as informações de cadastro de um usuário registrado no sistema:
                        </b>
                        <p>Clique no botão "Editar" na tabela selecionando a linha correspondente, para ser redirecionado a tela onde a atualização de um registro poderá ter suas informações atualizadas.</p>
                        <p>Após as atualizações efetivadas, clique no botão "Salvar Alterações" e retorne para a tabela de gerenciamento dos usuários, clicando no botão "Voltar"</p>
                        <b>
                            3. Para excluir um Usuário cadastrado:
                        </b>
                        <p>Clique no botão "Excluir" na tabela selecionando a linha correspondente ao usuário que deseja excluir.</p>
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