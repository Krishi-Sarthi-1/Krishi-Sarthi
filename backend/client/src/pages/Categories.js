import React, { useState } from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
    return (
        <Layout title={'All Categories'}>
            <div className='container' style={{ marginTop: "100px" }}>
                <div className='row container'>
                    {categories.map(c => (
                        <div className='col-md-6 m-2' key={c._id}>
                            <div className='card'>
                                <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories