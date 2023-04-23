import React, { useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [question, setQuestion] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post(
                `/api/v1/auth/forgot-password`,
                { email, newPassword, question }
            )
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)


                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title={'Forgot Password'}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Reset Password</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Email'
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='First Novel'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Password'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword