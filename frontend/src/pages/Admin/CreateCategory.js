import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Category from '../../components/Form/Category'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong in input form')
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/category/get-category`)
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data?.success) {
                toast.success(`${updatedName} is updated successfully`)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${id}`)
            if (data?.success) {
                toast.success(`category is deleted successfully`)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={'Dashboard-Create Category'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <Category
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td id={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-primary ms-2'
                                                        onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>
                                                        Edit
                                                    </button>
                                                </td>
                                                <td><button className='btn btn-danger ms-2' onClick={() => { handleDelete(c._id) }}>Delete</button></td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(true)}
                            footer={null}
                            visible={visible}
                        >
                            <Category value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory