import React,{ useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



export default function EditarLivro() {
    const {id} = useParams();
    const [data, setData] = useState([])

    // const url = "http://localhost:4040" //para local
    //const url = "http://129.146.68.51/aluno40-pfsii" //para infra

    useEffect(() => {
        axios.get(`http://localhost:4040/livros/`+ id)
        .then(res => {
            console.log(res)
            setData(res.data[0]); 
        })
        .catch(err => console.log(err))
    }, [id])

    function handleSubmit(event) {
        event.preventDefault()
        axios.put(`http://localhost:4040/livros/`+ id, data)
        .then(res => {
            alert("Informações atualizadas com sucesso!")
        })
    }
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">  
        <Container className="text-center">
            <h3>Catalogação de Obras</h3>
            <h5>Edição de informações da obra</h5>
            <h6>certifique-se de ter preenchido todos os dados corretamente antes de realizar o envio</h6>
        </Container>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3"> 
                        <Form.Label htmlFor="isbn">ISBN</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="informe o ISBN do livro" 
                                      name="nome"
                                      value={data.idlivros}
                                      onChange={e => setData({...data, idlivros: e.target.value})}/> 
                        {/* {errors.nome && <p style={{color: "red"}}>{errors.nome}</p>}          */}
                    </Form.Group>
                   
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="titulo">Informe o Título da Obra</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="informe o título da obra" 
                                      name="titulo"
                                      value={data.titulo}
                                      onChange={e => setData({...data, titulo: e.target.value})}/> 
                        {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="autor">Autor</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="informe o nome do autor(es)" 
                                      name="autor"
                                      value={data.autor}
                                      onChange={e => setData({...data, autor: e.target.value})}/> 
                        {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                    </Form.Group>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="">Informe a Data de Publicação</Form.Label>
                        <Form.Control type="text" 
                                      placeholder=" " 
                                      name=""
                                      value={data.publicado}
                                      onChange={e => setData({...data, publicado: e.target.value})}/> 
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
                                      value={data.local}
                                      onChange={e => setData({...data, local: e.target.value})}/> 
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
                                      value={data.material}
                                      onChange={e => setData({...data, material: e.target.value})}/> 
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
                                      value={data.idioma}
                                      onChange={e => setData({...data, idioma: e.target.value})}/> 
                        {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cpf">Idioma original da Obra</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="" 
                                      name="rg"
                                      value={data.original}
                                      onChange={e => setData({...data, original: e.target.value})}/> 
                        {/* {errors.cpf && <p style={{color: "red"}}>{errors.cpf}</p>}               */}
                    </Form.Group>

                </Col>
            </Row>
                <Row>
                    <Col>
                        <div className="d-flex">
                            <Button  className="mb-3 btn btn-success pb-1 m-1" type="submit">
                                salvar alterações
                            </Button>
                            <Link to="/Livro" className=" mb-3 btn btn-secondary pb-1 m-1">
                                voltar
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Form>
     </div> 
    );
}