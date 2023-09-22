import { Cabecalho } from "./Cabecalho";
import Menu from "./Menu";
import { Container } from "react-bootstrap";

function Pagina(props){
    return(
        <div>
            <Cabecalho texto="DIGITECA" subtexto="Biblioteca Municipal Prefeito Mitsuo Marubayashi"/>
            <Menu/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Pagina;