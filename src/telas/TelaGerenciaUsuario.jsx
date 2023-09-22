import Pagina from "../templates/Pagina";
import TabelaUsuarios from "../tabelas/TabelaUsuarios";



export default function TelaGerenciaUsuario(props){  
   

    return(
        <Pagina>
                {
                   <TabelaUsuarios />
                }
        </Pagina>
    );
}