import {useState, useEffect, useContext} from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnection' 
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

import './style.css';

const lisRef = collection(db, "customers")

export default function New() {

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCostumer] = useState(true);
    const [costumerSelected, setCostumerSelected] = useState(0);

    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')

    useEffect(() =>{
        async function loadCustomer(){
            const querySnapshot = await getDocs(lisRef)
        .then((snapshot)=>{
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    nomeFantasia: doc.data().nomeFantasia
                })
            })

            if(snapshot.docs.size === 0){
                console.log("NENHUMA EMPRESA ENCONTRADA");
                setCustomers([ {id: '1', nomeFantasia: 'FREELA'} ]);
                setLoadCostumer(false);
                return;
            }

            setCustomers(lista);
            setLoadCostumer(false)

        })
        .catch((error)=>{
            console.log("ERRO AO BUSCAR OS CLIENTES", error)
            setLoadCostumer(false);
            setCustomers([{id: '1', nomeFantasia: 'FREELA'}])
        })
        }

        loadCustomer();
    },[])


    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeSelect(e){
        setCostumerSelected(e.target.value)
        console.log(customers[e.target.value].nomeFantasia);
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile">

                        <label>Clientes</label>
                       {
                        loadCustomer ? (
                            <input type="text" disabled ={true} value="Carregando..."/>
                        ) : (
                            <select value={costumerSelected} onChange={handleChangeSelect}>
                                {customers.map((item, index) => {
                                    return(
                                        <option key={index} value={index}>
                                        {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )
                       }

                        <label>Assunto</label>
                        <select>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>

                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                                
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema(opcional)."
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

