import Pagina from "../templates/Pagina";
import TabelaLivros from "../tabelas/TabelaLivros";



export default function TelaLivro(props){  
   

    return(
        <Pagina>
                {
                   <TabelaLivros />
                }
        </Pagina>
    );
}