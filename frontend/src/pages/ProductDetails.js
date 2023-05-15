import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (params?.slug)
            getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='container m-4 row'>
                <div className='col-md-6'>
                    <img
                        src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                    />
                </div>
                <div className='col-md-6'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: {product.price}</h6>
                    <h6>Category: {product.category?.name}</h6>
                    <button class="btn btn-secondary m-1">Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className='container m-4 row'>
                <h6>Similar Products</h6>
                {relatedProducts.length < 1 && (<p>No Similar Products</p>)}
                {relatedProducts?.map(p => (
                    <div className="m-2 card" style={{ width: '18rem' }}>
                        <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 25)}...</p>
                            <p className="card-text"> {p.price}</p>
                           
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default ProductDetails