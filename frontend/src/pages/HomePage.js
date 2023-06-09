import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'



const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/category/get-category`)
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        const handleGeolocation = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (lat && lng) {
                setLatitude(lat);
                setLongitude(lng);
            }
            console.log("Latitude:", lat);
            console.log("Longitude:", lng);
        };

        const handleError = (error) => {
            console.error("Error getting geolocation:", error);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleGeolocation, handleError);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

    }, [])

    useEffect(() => {

        if (latitude !== 0 && longitude !== 0) {
            getAllCategories()
            getTotal()
        }
    }, [latitude, longitude])
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}?lat=${latitude}&long=${longitude}`)
            setLoading(false)
            setProducts(data.products)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const getTotal = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-count?lat=${latitude}&long=${longitude}`)
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}?lat=${latitude}&long=${longitude}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }

    useEffect(() => {
        if ((!checked.length || !radio.length) && (latitude !== 0 && longitude !== 0))
            getAllProducts()
    }, [checked.length, radio.length, latitude, longitude])

    useEffect(() => {
        if (checked.length || radio.length)
            filterProduct()
    }, [checked, radio])

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v1/product/product-filters`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={'Shop Now'}>
            <div className='mt-3 row'>
                <div className='col-md-2'>
                    <h4 className='text-center'>Filter By Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map(c => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center'>Filter By Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column'>
                        <button
                            className='btn btn-danger'
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='flex-wrap d-flex'>
                        {products?.map(p => (
                            <div className="m-2 card" style={{ width: '18rem' }}>
                                <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 25)}...</p>
                                    <p className="card-text"><i class="fa fa-inr"></i> {p.price}</p>
                                    <button class="btn btn-primary m-1" onClick={() => navigate(`/Product/${p.slug}`)}>More details</button>
                                    <button class="btn btn-secondary m-1"
                                        onClick={() => {
                                            setCart([...cart, p])
                                            localStorage.setItem(
                                                'cart',
                                                JSON.stringify([...cart, p])
                                            )
                                            toast.success('Item added to cart')
                                        }}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='p-3 m-2'>
                        {products && products.length < total && (
                            <button
                                className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage(page + 1)
                                }}>
                                {loading ? 'loading...' : 'Loadmore'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage

// export default function HomePage(){
//     return(
//         <h1>Hello world</h1>
//     )
// }