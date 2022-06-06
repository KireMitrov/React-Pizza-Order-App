import { useEffect, useState } from "react";
import Api from "../../Api";

const OrdersPage = () =>{
    const [orders, setOrders] = useState([]);
    const [hideConfirmed, setOnlyConfirmed] = useState(true)
    
    useEffect(() => {
        Api().get('/orders')
        .then((response) => setOrders(response.data))
        .catch(console.error)
    },[]);

    const deleteOrder = (orderId) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmationAnswer = confirm('Are you sure you want to delete order' + orderId);
        if (!confirmationAnswer) return;
        Api().delete(`/orders/${orderId}`)
        .then ((response) => {
            console.log('response', response);
            const {data} = response;
            if(data.deletedCount === 1){
                const newOrders = orders.filter(order => order.id !== orderId);
                setOrders(newOrders);
            } else {
                alert('Something went wrong')
            }
        })
        .catch(console.error);
    };

    const confirmOrder = (orderId) => {
        Api().put(`/orders/${orderId}`, {
            confirmed: true,
        }).then (response => {
            console.log('response', response);
            const { data } = response
            if (data && data.ok){

                const newOrders = orders.map((order) => {
                    if (order._id === orderId ){
                        return { ...order, confirmed: true}
                    }
                    return order;
                })
            }
        }). catch(console.error);
    }
    const handleHideConfirmed = (e) => {
        setOnlyConfirmed(e.target.checked);
}

    
    return (
        <div >
            <label>
                Hide confirmed:
                <input type="checkbox" checked={hideConfirmed} onChange={handleHideConfirmed}></input>
            </label>
            {orders
            .filter(order => hideConfirmed ? !order.confirmed : true)
            .map(order => (
                <div className="order">
                    {order.confirmed ? 'CONFIRMED' : ""}
                    <button onClick={() => {deleteOrder(order._id)}} className="delete-btn">x</button>
                    <h5>Order Id:{order._id}</h5>
                    <h5>Email:{order.email}</h5>
                    <h5>Addresa:{order.address}</h5>
                    <ol>
                        {order.cartItems.map(item => (
                            <li>{item.name}, {item.selectedPizzaSize}, X{item.quantity} </li>
                        ))}
                    </ol>
                    <button onClick={() => confirmOrder(order._id)}>Confirm order</button>
                </div>
            ))}
        </div>
    )
}

export default OrdersPage;