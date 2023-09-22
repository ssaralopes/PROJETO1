import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function TabelaLivros() {

    // 4- Depois você criou essa função para buscar os dados la na url jason-server com o nome passado como parâmetro





    // 2- depois de criar o useEfect, criou essas duas variaveis aqui
    const [columns,setColumns] = useState([])
    const [records, setRecords] = useState([])
    //const url = "http://localhost:4040" //para local
    const url = "http://129.146.68.51/aluno40-pfsii" //para infra


    
    // 1- primeiro você criou isso aqui que é o que vai buscar os dados lá na url do json-server
    useEffect(()=>{
       axios.get(url+'/livros')
        .then(res => {
            setColumns(Object.keys(res.data[0]))
            setRecords(res.data)
            
        })
    }, [])
    
    // FUNÇÃO DE FILTRO PARA EXEMPLARES
    const Filtro = (event) =>{
        setRecords(records.filter(f => f.titulo.toLowerCase().includes(event.target.value)))
    }   
    



    return (
        <Container>      
          <div className="shadow p-3 mb-5 bg-white rounded container mt-3"> 
                <div className="d-flex">
                    <Form className="d-flex mb-3  pb-1 m-1">

                          <Form.Control onChange={Filtro} className="form-control  " placeholder="Pesquisar Exemplar" type="search"  id="example-search-input"/>
                    </Form>
                    <Link to="/CadastroLivro" className=" mb-3 btn btn-dark pb-1 m-1">
                                Novo cadastro
                    </Link>
                </div>
                   <Table  className="table">
                            <thead>
                                    <tr>
                                    {columns.map((c, idlivros) =>(
                                        <th key={idlivros}>{c}</th>
                                        
                                    ))}
                                    </tr>
                                    
                            </thead>
                            <tbody>
                                    {
                                        records.map((d, idlivros) => (
                                            <tr key={idlivros}>
                                                <td>{d.idlivros}</td>
                                                <td>{d.titulo}</td>
                                                <td>{d.autor}</td>
                                                <td>{d.publicado}</td>
                                                <td>{d.local}</td>
                                                <td>{d.material}</td>
                                                <td>{d.idioma}</td>
                                                <td>{d.original}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Link to={`/editarLivro/${d.idlivros}`}className="btn btn-sm btn-success m-3 pb-1">Atualizar</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }  
                            </tbody>
                    </Table>     
          </div>        
        </Container>
    );
}