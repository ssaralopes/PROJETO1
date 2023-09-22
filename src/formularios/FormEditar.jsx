import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



export default function EditarUsuario() {
    const {id} = useParams();
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://129.146.68.51/aluno40-pfsii/usuarios/'+ id)
        .then(res => {
            console.log(res)
            setData(res.data[0]); 
        })
        .catch(err => console.log(err))
    }, [id])

    function handleSubmit(event) {
        event.preventDefault()
        axios.put('https://129.146.68.51/aluno40-pfsii/usuarios/'+ id, data)
        .then(res => {
            alert("Os dados do usuário foram atualizados!")
        })
    }
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">  
            <Container className="text-center">
                <h3>Editar dados do usuário</h3>
                <h6>informe todos os dados a serem alterados nos campos abaixo:</h6>
            </Container>
            <Form onSubmit={handleSubmit}>
            <Row>
                    <Col>
                        <Form.Group className="mb-3"> 
                            <Form.Label htmlFor="nome">Código do usuário</Form.Label>
                            <Form.Control type="text" 
                                          disabled
                                          name="nome"
                                          value={data.id}/> 
                            {/* {errors.nome && <p style={{color: "red"}}>{errors.nome}</p>}          */}
                        </Form.Group>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3"> 
                            <Form.Label htmlFor="nome">Nome Completo</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe o nome do usuário" 
                                          name="nome"
                                          value={data.nome}
                                          onChange={e => setData({...data, nome: e.target.value})}
                                          /> 
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
                                          value={data.cpf}
                                          disabled
                                        //   onChange={e => setData({...data, cpf: e.target.value})}
                                          /> 
                            {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="cpf">RG</Form.Label>
                            <Form.Control type="text" 
                                          name="cpf"
                                          value={data.rg}
                                          disabled
                                        //   onChange={e => setData({...data, cpf: e.target.value})}
                                          /> 
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
                                          value={data.email}
                                          onChange={e => setData({...data, email: e.target.value})}
                                          /> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="endereco">Endereço Residencial</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="informe o endereço residencial do usuário" 
                                          name="email"
                                          value={data.endereco}
                                          onChange={e => setData({...data, endereco: e.target.value})}
                                          /> 
                            {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>}          */}
                        </Form.Group>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex">
                            <Button  className="mb-3 btn btn-success pb-1 m-1" type="submit">
                                salvar alterações
                            </Button>
                            <Link to="/gerenciamentoUsuario" className=" mb-3 btn btn-secondary pb-1 m-1">
                                voltar
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Form>
     </div> 
    );
}