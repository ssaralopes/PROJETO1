import { useState } from "react";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Validation from "../Validation";
import { BsQuestionCircle } from "react-icons/bs";


export default function FormCadUsuario() {
        
    // 1- você criou primeiro essa variável pra armazenar os valores dos campos do formulário
        const [nome, setNome] = useState('');
        const [cpf, setCpf] = useState('');
        const [rg, setRg] = useState('');
        const [email, setEmail] = useState('');
        const [endereco, setEndereco] = useState('');


    // 2- depois você criou essa função, que vai imprimir no console os valores armazenados 
    //                              (funcionou!!!   ＼(￣▽￣)／)
        // const postData = () => {
        //     console.log(nome);  
        //     console.log(cpf);  
        //     console.log(email);  
        // }

    // 3- depois você criou essa função pra quando o botão de enviar dados for clicado
    //    os dados armazenados pelas vaiáveis nome, cpf, email e postData sejam adicionados
    //    na localhost definida pelo axios.post:
    
         const postData = () => {
                axios.post('http://localhost:4040/usuarios', {nome, cpf, rg, email, endereco})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert("dados enviados com sucesso!");
                }).catch(err => console.log(err));
            }

 const [helpModalShow, setHelpModalShow] = useState(false);  

    return (
      <div className="shadow p-3 mb-5 bg-white rounded">  
            <Container className="text-center">
                <h3>Registrar um novo usuário</h3>
                <h6>Preencha as informações necessárias para efetuar o registro de um novo usuário no Sistema.</h6>
            </Container>
            <Form onSubmit={postData}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3"> 
                            <Form.Label htmlFor="nome">Nome Completo</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe seu nome completo" 
                                          name="nome"
                                          onChange={(e) => setNome(e.target.value)}/> 
                            {/* {errors.nome && <p style={{color: "red"}}>{errors.nome}</p>}          */}
                        </Form.Group>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">CPF</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="000.000.000-00" 
                                          name="cpf"
                                          onChange={(e) => setCpf(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">RG</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe seu número de RG" 
                                          name="rg"
                                          onChange={(e) => setRg(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">E-mail</Form.Label>
                            <Form.Control type="email" 
                                          placeholder="informe o endereço de e-mail do usuário" 
                                          name="email"
                                          onChange={(e) => setEmail(e.target.value)}/> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="endereco">Endereço Residencial</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe o seu endereço residencial" 
                                          name="email"
                                          onChange={(e) => setEndereco(e.target.value)}/> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button  className="mb-3 btn btn-success" type="submit">
                            Enviar dados
                        </Button>
                        <Link to="/" className=" mb-3 btn btn-secondary pb-1 m-1">
                                Retornar a Página Inicial
                        </Link>
                    </Col>
                </Row>
            </Form>
            <Button
                        variant="light"
                        className="rounded-circle p-2 position-fixed text-white"
                        style={{ bottom: "20px", right: "20px", background: "#72ECAA"  }}
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
                    <b>1. O formulário de registro de um novo usuário é importante para inserir novos membros da Biblioteca no sistema, coletando informações essenciais e facilitando o processo de adesão para garantir um cadastro eficiente.</b>
                    <p>
                    
                    </p>
                    <b>Informe seu Nome Completo:</b>
                    <p> Campo destinado a receber o nome completo do novo usuário, garantindo a identificação precisa.</p>
                    <b>CPF:</b>
                    <p>Campo específico para a inserção do número do Cadastro de Pessoas Físicas (CPF), garantindo a unicidade e rastreabilidade do usuário.</p>
                    
                    <b>Informe o Número de RG:</b>
                    <p>Campo designado para a inclusão do número do Registro Geral (RG) do usuário, um documento de identificação oficial.</p>
                
                    <b>Informe o Endereço de E-mail do Usuário:</b>
                    <p>Espaço dedicado para inserção do endereço de e-mail do novo usuário, proporcionando um meio de comunicação vital.</p>
                    

                    <b>Informe o Seu Endereço Residencial:</b>
                    <p>Campo para a inclusão do endereço residencial completo do usuário, facilitando a comunicação e envio de informações relevantes.</p>
                    <b>2. Para Salvar as informações, clique no botão "Enviar Dados" ao final da página, para salvar o registro do Usuário da Biblioteca no Sistema.</b>
                    <p></p>
                    <b>3. Para retornar a Página Inicial, utilize o botão "Retornar a Página Inicial"</b>
                    <p></p>
                    <b>4. Para visualizar, alterar informações ou, ainda, excluir algum usuário, navegue até o menu lateral e vá até Gerenciamento e selecione a opção "Usuários".</b>
                    {/* Adicione mais informações ou instruções conforme necessário */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setHelpModalShow(false)}>
                    Fechar
                    </Button>
                </Modal.Footer>
                </Modal>
     </div> 
    );
}

