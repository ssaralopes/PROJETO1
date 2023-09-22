import TelaCadastroUsuario from "./telas/TelaCadastroUsuario";
import TelaGerenciaUsuario from "./telas/TelaGerenciaUsuario";
import TelaEditar from "./telas/TelaEditar";
import TelaLivro from "./telas/TelaLivros";
import TelaCadastroLivro from "./telas/TelaCadastroLivro";
import TelaEditLivros from "./telas/TelaEditLivros";
import TelaEmprestimos from "./telas/TelaEmprestimos";
import TelaMenu from "./telas/TelaMenu";
import Tela404 from "./telas/Tela404";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastroUsuario" element={<TelaCadastroUsuario/>}/>
                    <Route path="/gerenciamentoUsuario" element={<TelaGerenciaUsuario/>}/>
                    <Route path="/editarUsuario/:id" element={<TelaEditar/>}/>
                    <Route path="/Livro" element={<TelaLivro/>}/>
                    <Route path="/CadastroLivro" element={<TelaCadastroLivro/>}/>
                    <Route path="/EditarLivro/:id" element={<TelaEditLivros/>}/>
                    <Route path="/" element={<TelaMenu/>}/>
                    <Route path="/GerenciamentoEmprestimos" element={<TelaEmprestimos/>}/>
                    <Route path="/*" element={<Tela404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;