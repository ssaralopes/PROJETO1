import { Container } from "react-bootstrap";


export function Cabecalho(props){
    return(
        <div className="d-flex text-white" style={{background: "#72ECAA"}}>
            <Container className='m-3 text-left'>
                <h1 className="display-1 fw-bold fw-bolder">
                    {props.texto}
                </h1>
                <h4 className="fw-bold m-0" style={{color: "#980594"}}>
                    {props.subtexto}
                </h4>
            </Container>
        </div>
    )
}