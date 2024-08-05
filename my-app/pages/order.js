import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const order = ({ order, clearCart }) => {

  // const router=useRouter()
  // const {id}=router.query;
  // const products=order.products
  const [date,setdate]=useState(order.createdAt)
  useEffect(() => {
    // if(router.query.clearCart == 1){
    //   clearCart()
    // }
    const d=new Date(order.createdAt)
    setdate(d)
  }, [])
  // console.log(order)


  return (
    <div>
      <Head>
        <title>Order :- Coding Tshirt</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden mt-12 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODING TSHIRT</h2>
              {/* <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID : {order.orderId}</h1> */}
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID : #95494494</h1>
              {/* <p className="leading-relaxed mb-4">Your has been successfully placed:  your Payment status is {order.status}</p> */}
              <p className="leading-relaxed mb-4">Your has been successfully placed:  your Payment status is paid</p>
              <p className="leading-relaxed mb-4">Order Placed On: {date && date.toLocaleDateString('en-IN',{year: 'numeric', month: 'numeric', day: 'numeric'})}</p>
              <div className="flex mb-4">
                <a className="flex-grow text-center text-indigo py-2 text-lg px-1">Items Description</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Price</a>
              </div>

              {/* {Object.keys(products).map((key)=>{
                return (
              <div key={key} className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">{products[key].name} ({products[key].size}/{products[key].color})</span>
                <span className="ml-auto text-gray-900">{products[key].qty}</span>
                <span className="ml-auto text-gray-900">₹{products[key].price * products[key].qty = products[key].price * products[key].qty}</span>
              </div>)})} */}

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">wear the Tshirt</span>
                <span className="ml-auto text-gray-900">2</span>
                <span className="ml-auto text-gray-900">₹499.00</span>
              </div>

              <div className="flex">
                {/* <span className="my-2 title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span> */}
                <span className="my-2 title-font font-medium text-2xl text-gray-900">Subtotal: ₹499.00</span>
                <div className='flex'>
                  <button className="flex mx-6 my-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm">Track Order</button>
                </div>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}


//after getting the merchant id and it can be resumed
// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI)
//   }
//   let order=await Order.findById(context.query.id)
//   console.log(order)
//   return { props: {order: JSON.parse(JSON.stringify(order))} }
// }

export default order;
