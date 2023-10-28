import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Validation from "../Validation";



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

         // const url = "http://localhost:4040" //para local
         //const url = "http://129.146.68.51/aluno40-pfsii" //para infra
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
    
   
          
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">  
            <Container className="text-center">
                <h3>Crie sua carteirinha de usuário online</h3>
                <h6>preencha seus dados</h6>
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
                    </Col>
                </Row>
            </Form>
     </div> 
    );
}

