import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
    return (
        <Container
            className="shadow p-3 mb-5 rounded container mt-3 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#72ECAA" }}
        >
            <div className="p-3 bg-white w-25">
                <Form>
                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome de Usuário"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Senha de Usuário"
                        />
                    </Form.Group>

                    <Button className="btn btn-success mt-3" block>
                        Entrar
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;