import React, { useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/Auth.css"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [question, setQuestion] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post(
                `/api/v1/auth/register`,
                { name, email, password, phone, address, question }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    console.log(process.env.REACT_APP_API)
    return (
        <Layout title={'Register'}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Register Form</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Name'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Phone'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Address'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='First Novel'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register