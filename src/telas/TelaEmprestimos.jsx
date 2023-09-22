import Pagina from "../templates/Pagina";
import TabelaEmprestimos from "../tabelas/TabelaEmprestimos";



export default function TelaEmprestimos(props){  
   

    return(
        <Pagina>
                {
                   <TabelaEmprestimos/>
                }
        </Pagina>
    );
}