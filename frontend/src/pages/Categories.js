import React, { useState } from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
    return (
        <Layout title={'All Categories'}>
            <div className='container' style={{ marginTop: "100px" }}>
                <div className='container row'>
                    {categories.map(c => (
                        <div className='m-2 col-md-6' key={c._id}>
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