import { useState, useContext } from 'react'
import './style.css'

import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth' 

export default function SignIn() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {SignIn} = useContext(AuthContext)

    function handleSubmite(e){
        e.preventDefault();

        if (name !== '' && email !== '' && password !== ''){
            alert('FAZER CADASTRO')
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form onSubmit={handleSubmite}>
                    <h1>Nova Conta </h1>
                    <input type="text" placeholder='Seu nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <input type="text" placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'> Cadastrar </button>
                </form>

                <Link to="/">Já possui uma conta? Faça login</Link> 

            </div>
        </div>
    )
}