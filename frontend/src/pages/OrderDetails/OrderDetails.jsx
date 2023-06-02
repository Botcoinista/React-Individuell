import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const DetailsOrders = () => {

    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
            console.log(res.data)
            setOrder(res.data)
        })
            .catch((error) => {
            console.error(error)
        })
    }, [])

    return (
      <div>DetailsOrders</div>
    )
}

export default DetailsOrders