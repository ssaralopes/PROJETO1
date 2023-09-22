import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function TabelaUsuarios() {
    //const url = "http://localhost:4040" //para local
    const url = "http://129.146.68.51/aluno40-pfsii" //para infra

    // 4- Depois você criou essa função para buscar os dados la na url jason-server com o nome parrado como parâmetro

    // 3- Depois você criou essa função onDelete para exclusão 
    //    do usuário dnetro da tabela de gerenciamento.
    const onDelete = (id) => {
        axios.delete(`${url}/usuarios${id} `)
        .then(res => {
            console.log(res);
            console.log(res.data);
            alert("usuário será excluído do banco de dados! ");
        }).catch(err => console.log(err));
    }



    // 2- depois de criar o useEfect, criou essas duas variaveis aqui
    const [columns,setColumns] = useState([])
    const [records, setRecords] = useState([])


    
    // 1- primeiro você criou isso aqui que é o que vai buscar os dados lá na url do json-server
    useEffect(()=>{
       axios.get(url+'/usuarios')
        .then(res => {
            setColumns(Object.keys(res.data[0]))
            setRecords(res.data)
        })
    }, [])

    
   // FUNÇÃO DE FILTRO PARA USUÁRIOS
       const Filtro = (event) =>{
        setRecords(records.filter(f => f.nome.toLowerCase().includes(event.target.value)))
    }  

    return (
        <Container>
            <div className="shadow p-3 mb-5 bg-white rounded container mt-3">

            <div className="d-flex">
                    <Form className="d-flex mb-3  pb-1 m-1">

                          <Form.Control onChange={Filtro} className="form-control  " placeholder="Pesquisar Usuário" type="search"  id="example-search-input"/>
                    </Form>
                </div>
                 <Table  className="table">
                            <thead>
                                    <tr>
                                    {columns.map((c, id) =>(
                                        <th key={id}>{c}</th>
                                        
                                    ))}
                                    </tr>
                                    
                            </thead>
                            <tbody>
                                    {
                                        records.map((d, id) => (
                                            <tr key={id}>
                                                <td>{d.id}</td>
                                                <td>{d.nome}</td>
                                                <td>{d.cpf}</td>
                                                <td>{d.rg}</td>
                                                <td>{d.email}</td>
                                                <td>{d.endereco}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <Link to={`/editarUsuario/${d.id}`}className="btn btn-sm btn-success m-3 pb-1">Editar</Link>
                                                        <Link onClick={() => onDelete(d.id)} className="btn btn-sm  btn-danger m-3 pb-1">Excluir</Link>
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