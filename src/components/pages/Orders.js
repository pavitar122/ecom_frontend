import React, { useEffect, useState } from 'react';
import Order from '../fixed/Order';
import axios from 'axios';
import { useCart } from '../../globalState/globalState';

const Orders = () => {
    const { user } = useCart();
    const [orders, setOrders] = useState([]);
    const [message, setmessage] = useState(null)

    const fetchOrders = async (token) => {
        const config = {
            headers: {
                'Authorization': token,
            },
        };
        try {
            const response = await axios.get('https://ecom-backend-zlhk.onrender.com/order/fetchOrder', config);
            if (response) {
                setOrders(response.data);
            }
        } catch (error) {
            console.log(error);
            setmessage(error.response.data.message)
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchOrders(user.token);
        }
    }, [user]);

    return (
        <section className='orders-section'>
            <div className='top-padding'></div>
            {message ? (<h1 className='orders-section__message'>{message}</h1>) : (

                <div className='orders'>
                    {orders.slice().reverse().map((order, orderIndex) => (
                        <div className='order' key={orderIndex}>
                            <h1>Order number: {orderIndex + 1}</h1>
                            {order.products.map((productItem, productIndex) => (
                                <Order key={productIndex}
                                    name={productItem.product.name}
                                    quantity={productItem.quantity}
                                    image={productItem.product.image}
                                    address={order.address}
                                    price={productItem.product.price}
                                />
                            ))}
                        </div>
                    ))}
                </div>

            )}

        </section>
    );
};

export default Orders;
