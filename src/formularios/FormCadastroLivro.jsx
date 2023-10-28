import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Validation from "../Validation";



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
    // 
    // url infraestrutura: 'https://129.146.68.51/aluno40-pfsii/livros'
         const postData = () => {
                axios.post('http://localhost:4040/livros', {idlivros, titulo, autor, publicado, local, material, idioma, original})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert("dados enviados com sucesso!");
                }).catch(err => console.log(err));
            }
    
   
          
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
                                          placeholder="informe o ISBN do livro" 
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
                                          placeholder="informe o título da obra" 
                                          name="cpf"
                                          onChange={(e) => setTitulo(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Autor</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe o nome do autor(es)" 
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
                                          placeholder=" " 
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
                                          placeholder=" " 
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
                                          placeholder=" " 
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
                                          placeholder=" " 
                                          name="cpf"
                                          onChange={(e) => setIdioma(e.target.value)}/> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">Idioma original da Obra</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="" 
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
     </div> 
    );
}

