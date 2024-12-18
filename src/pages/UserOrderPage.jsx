import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

function UserOrderPage() {
  return (
    <>
    <Navbar>
    <h1 className=' text-center mx-auto text-4xl font-bold'>Your Orders</h1>

        <UserOrders></UserOrders>
    </Navbar>
    </>
  )
}

export default UserOrderPage