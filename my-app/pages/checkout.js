import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const checkout = ({ clearCart, cart, addToCart, removeFromCart, subtotal }) => {

  // get a transaction token
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [address, setaddress] = useState('')
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const [disabled, setdisabled] = useState(true)
  const [user, setuser] = useState({ value: null })

  const fetchdata = async (token) => {
    let data = { token }
    let a = await fetch("http://localhost:3000/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json();
    // console.log(res)
    setname(res.name)
    setaddress(res.address)
    setphone(res.phone)
    setpincode(res.pincode)
    getpincode(res.pincode)
  }

  const getpincode = async(pin) => {
    let pins = await fetch(`http://localhost:3000/api/pincode`)
    let pinjson = await pins.json();
    if (Object.keys(pinjson).includes(pin)) {
      setstate(pinjson[pin][1])
      setcity(pinjson[pin][0])
    }
    else {
      setstate('')
      setcity('')
    }
  }

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setuser(myuser)
      setemail(myuser.email)
      fetchdata(myuser.token)
    }
  }, [])

  useEffect(() => {
    if (name.length >= 3 && email.length >= 3 && phone.length >= 3 && address.length >= 3 && pincode.length >= 3) {
      setdisabled(false)
    }
    else {
      setdisabled(true)
    }
  }, [name, email, phone, pincode, address])

  const handleChange = async (e) => {

    if (e.target.name == "name") {
      setname(e.target.value)
    }
    else if (e.target.name == "email") {
      setemail(e.target.value)
    }
    else if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setpincode(e.target.value)
      if (e.target.value.length == 6) {
        getpincode(e.target.value)
      }
      else {
        setstate('')
        setcity('')
      }
    }
    else if (e.target.name == "address") {
      setaddress(e.target.value)
    }
  }


  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now())

    const data = { cart, subtotal, oid, email: email, name, address, pincode, phone }
    let a = await fetch(`http://localhost:3000/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    if (txnRes.success) {
      let txnToken = txnRes.txnToken

      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subtotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            // console.log("notifyMerchant handler function called");
            // console.log("eventName => ", eventName);
            // console.log("data => ", data);
          }
        }
      };



      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        // console.log("error => ", error);
      });
    }
    else {
      if (txnRes.cartClear) {
        clearCart()
      }
      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

    }
  }


  return (
    <>
    <Head>
      <title>Checkout :- Coding Tshirt</title>
    </Head>
      {/* <head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} onload="" crossorigin="anonymous"></Script> */}
      <div className='container px-2 sm:m-auto mt-24 min-h-screen'>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />

        <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
        <h2 className='ml-3 font-bold text-xl'>1. Delivery Details</h2>
        <div className='mx-auto flex my-4'>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>

              {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> :
                <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

        </div>
        <div className='px-2 w-full'>
          <div className=" mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} name="address" id="address" cols={30} rows={2} className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
          </div>
        </div>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
              <input placeholder='Your 10 Digit Phone Number' onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

        </div>
        <div className='mx-auto flex my-2'>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='px-2 w-1/2'>
            <div className=" mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
              <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>


        </div>

        <h2 className='ml-3 font-bold text-xl'>2. Review Cart Item and Pay</h2>
        <div className="mb-3 sideCart text-white bg-green-100 p-6 m-2">
          <h2 className='font-bold text-xl text-black'>Shopping Cart</h2>
          <span className='absolute top-5 right-2 cursor-pointer'><IoIosCloseCircle className='text-3xl text-black' /></span>

          <ol className='list-decimal font-semibold text-black'>

            {Object.keys(cart).length == 0 && <div className='my-2 font-normal'>Your Cart is Empty</div>}

            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-5">
                  <div className=' font-semibold text-black'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                  <div className='ml-2 flex font-semibold items-center justify-center text-black'><FaCircleMinus className='cursor-pointer text-red-950' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].size) }} /><span className='mx-2'>{cart[k].qty}</span><FaCirclePlus className='cursor-pointer text-red-950' onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].size) }} /></div>
                </div>
              </li>
            })}
          </ol>
          <span className="total text-black font-bold">Subtotal: {subtotal}</span>
        </div>
        <div className="mx-4">
          <button onClick={initiatePayment} disabled={disabled} className="disabled:bg-green-200 flex mb-4 text-white bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-md"><IoBagCheckSharp className='m-1' />Pay:  ₹{subtotal}</button>
        </div>
      </div>
    </>

  )
}


export default checkout
