import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
export default function Menu(props) {
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <LinkContainer to="/"><Navbar.Brand>Menu</Navbar.Brand></LinkContainer>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Ferramentas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <LinkContainer to="/*"><Nav.Link>Página Inicial</Nav.Link></LinkContainer>
                                    <LinkContainer to="/cadastroUsuario"><Nav.Link>Cadastro de usuários</Nav.Link></LinkContainer>

                                    <NavDropdown title="Gerenciamento" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                        <LinkContainer to="/gerenciamentoUsuario"><NavDropdown.Item>Usuários</NavDropdown.Item></LinkContainer>
                                        <LinkContainer to="/Livro"><NavDropdown.Item>Livros</NavDropdown.Item></LinkContainer>
                                        <LinkContainer to="/GerenciamentoEmprestimos"><NavDropdown.Item>Empréstimos</NavDropdown.Item></LinkContainer>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>

    )
}