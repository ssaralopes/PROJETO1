import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function TabelaLivros() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const [tiposBaixa, setTiposBaixa] = useState([]);
    const url = "http://localhost:4040"; // URL para local, ajuste conforme necessário
  
    useEffect(() => {
      // Função para buscar os tipos de baixa associados a um livro específico
      const buscarTiposDeBaixa = async (livro) => {
        const response = await axios.get(url + `/baixa/${livro.idlivros}`);
        return {
          possuiBaixa: response.data.nomebaixa !== "",
          motivoBaixa: response.data.nomebaixa,
        };
      };
  
      axios.get(url + "/livros").then(async (res) => {
        setColumns([...Object.keys(res.data[0]), "Possui Baixa", "Motivo da Baixa"]);
  
        const aux = await Promise.all(
          res.data.map(async (livro) => {
            const tiposBaixaInfo = await buscarTiposDeBaixa(livro);
            return {
              ...livro,
              ...tiposBaixaInfo,
            };
          })
        );
  
        setRecords(aux);
      });
  
      axios.get(url + "/baixas").then((res) => {
        setTiposBaixa(res.data);
      });
    }, []);
  
    const Filtro = (event) => {
      setRecords(records.filter((livro) => livro.titulo.toLowerCase().includes(event.target.value)));
    };

    
  
    return (
      <Container>
        <div className="shadow p-3 mb-5 bg-white rounded container mt-3">
          <div className="d-flex">
            <Form className="d-flex mb-3 pb-1 m-1">
              <Form.Control onChange={Filtro} className="form-control" placeholder="Pesquisar Exemplar" type="search" id="example-search-input" />
            </Form>
            <Link to="/CadastroLivro" className="mb-3 btn btn-dark pb-1 m-1">
              Novo cadastro
            </Link>
          </div>
          <Table className="table">
            <thead>
              <tr>
                {columns.map((c, idlivros) => (
                  <th key={idlivros}>{c}</th>
                ))}
                <th>Tipo de Baixa</th>
              </tr>
            </thead>
            <tbody>
              {records.map((livro, idlivros) => (
                <tr key={idlivros}>
                  <td>{livro.idlivros}</td>
                  <td>{livro.titulo}</td>
                  <td>{livro.autor}</td>
                  <td>{livro.publicado}</td>
                  <td>{livro.local}</td>
                  <td>{livro.material}</td>
                  <td>{livro.idioma}</td>
                  <td>{livro.original}</td>
                  <td>{livro.possuiBaixa ? "Sim" : "Não"}</td>
                  <td>{livro.motivoBaixa}</td>
                  <td>
                    <select>
                      {tiposBaixa.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nomebaixa}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/editarLivro/${livro.idlivros}`} className="btn btn-sm btn-success m-3 pb-1">
                        Atualizar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
}

// CÓDIGO ORIGINAL TABELA LIVROS SEM RELACIONAMENTO N:N (BAIXA DE LIVROS) 
//     return (
//         <Container>      
//           <div className="shadow p-3 mb-5 bg-white rounded container mt-3"> 
//                 <div className="d-flex">
//                     <Form className="d-flex mb-3  pb-1 m-1">

//                           <Form.Control onChange={Filtro} className="form-control  " placeholder="Pesquisar Exemplar" type="search"  id="example-search-input"/>
//                     </Form>
//                     <Link to="/CadastroLivro" className=" mb-3 btn btn-dark pb-1 m-1">
//                                 Novo cadastro
//                     </Link>
//                 </div>
//                    <Table  className="table">
//                             <thead>
//                                     <tr>
//                                     {columns.map((c, idlivros) =>(
//                                         <th key={idlivros}>{c}</th>
                                        
//                                     ))}
//                                     </tr>
                                    
//                             </thead>
//                             <tbody>
//                                     {
//                                         records.map((d, idlivros) => (
//                                             <tr key={idlivros}>
//                                                 <td>{d.idlivros}</td>
//                                                 <td>{d.titulo}</td>
//                                                 <td>{d.autor}</td>
//                                                 <td>{d.publicado}</td>
//                                                 <td>{d.local}</td>
//                                                 <td>{d.material}</td>
//                                                 <td>{d.idioma}</td>
//                                                 <td>{d.original}</td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center justify-content-center">
//                                                         <Link to={`/editarLivro/${d.idlivros}`}className="btn btn-sm btn-success m-3 pb-1">Atualizar</Link>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     }  
//                             </tbody>
//                     </Table>     
//           </div>        
//         </Container>
//     );
// }