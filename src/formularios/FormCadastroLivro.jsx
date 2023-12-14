import { useState } from "react";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsQuestionCircle } from "react-icons/bs";


export default function FormCadLivro() {
        
    // 1- você criou primeiro essa variável pra armazenar os valores dos campos do formulário
        const [idlivros, setId] = useState('');
        const [titulo, setTitulo] = useState('');
        const [autor, setAutor] = useState('');
        const [publicado, setPublicado] = useState('');
        const [local, setLocal] = useState('');
        const [material, setMaterial] = useState('');
        const [idioma, setIdioma] = useState('');
        const [original, setOriginal] = useState('');


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
                axios.post('http://localhost:4040/livros', {idlivros, titulo, autor, publicado, local, material, idioma, original})
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
                <h3>Catalogação de Obras</h3>
                <h6>preencha as informações abaixo para cadastrar um novo livro no acervo do sistema</h6>
            </Container>
            <Form onSubmit={postData}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3"> 
                            <Form.Label htmlFor="nome">ISBN</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o ISBN do livro" 
                                          name="nome"
                                          onChange={(e) => setId(e.target.value)}/> 
                            {/* {errors.nome && <p style={{color: "red"}}>{errors.nome}</p>}          */}
                        </Form.Group>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Informe o Título da Obra</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o título da obra" 
                                          name="cpf"
                                          onChange={(e) => setTitulo(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Autor</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o nome do autor(es)" 
                                          name="rg"
                                          onChange={(e) => setAutor(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Informe a Data de Publicação</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe e o Mês e Ano da publicação do livro " 
                                          name="email"
                                          onChange={(e) => setPublicado(e.target.value)}/> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="endereco">Informe a Localização dos Exemplares</Form.Label>
                            <Form.Control type="text" 
                                          placeholder=" Informe a localização dentro da Biblioteca dos exemplares deste livro" 
                                          name="email"
                                          onChange={(e) => setLocal(e.target.value)}/> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="endereco">Informe o tipo de material</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o material" 
                                          name="email"
                                          onChange={(e) => setMaterial(e.target.value)}/> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Idioma do livro</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o idioma em que a obra foi traduzida " 
                                          name="cpf"
                                          onChange={(e) => setIdioma(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Idioma original da Obra</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Informe o idioma original de escrita da obra " 
                                          name="rg"
                                          onChange={(e) => setOriginal(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button  className="mb-3 btn btn-success" type="submit">
                            Enviar dados
                        </Button>
                        <Link to="/Livro" className=" mb-3 btn btn-secondary pb-1 m-1">
                                voltar
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
                <b>
                Cadastro de um novo Livro no Sistema:
                </b>
                <p> </p>
                <b>
                1. Informe o ISBN do Livro
                </b>
                <p>Esse é o campo destinado a receber o International Standard Book Number (ISBN), o identificador exclusivo para obras literárias.</p>
                <b>
                2. Informe o Título da Obra:
                </b>
                <p>Esse é o campo para inserir o título completo da obra.</p>
                <b>
                3. Informe o Nome do(s) Autor(es):
                </b>
                <p>Esse é o espaço para incluir o nome do autor ou autores da obra.</p>
                <b>
                4. Informe o Mês e Ano da Publicação do Livro:    
                </b>
                <p>Esse é o campo para inserir o mês e o ano da publicação da obra.</p>
                <b>
                5. Informe a Localização dos Exemplares:    
                </b>
                <p>Campo destinado a descrever a localização específica dos exemplares do livro dentro da biblioteca.</p>
                <b>
                6. Informe o Material:    
                </b>
                <p>Campo para especificar o tipo de material, se é periodico, se é livro e(ou) outros.</p>
                <b>
                7. Informe o idioma em que a obra foi traduzida:   
                </b>
                <p>Espaço para indicar o idioma em que a obra foi traduzida.</p>
                <b>
                8. Informe o Idioma Original da Escrita da Obra:   
                </b>
                <p>Campo para inserir o idioma original no qual a obra foi escrita.</p>
                <b>
                    Salvando as informações:
                </b>
                <p>Clique no botão "Enviar Dados" ao final da página, para salvar o registro no Sistema.</p>
                <p>Para retornar a tabela de Gerenciamento de Livros, utilize o botão "voltar"</p>
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

