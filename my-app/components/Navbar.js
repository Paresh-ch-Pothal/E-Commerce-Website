import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { BsCart } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { IoBagCheckSharp, IoLogOut } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';

const Navbar = ({logout,user, cart, addToCart, removeFromCart, clearCart, subtotal }) => {

  const router=useRouter();
  const [sidebar,setsidebar]=useState(false)
  
  useEffect(()=>{
    Object.keys(cart).length !== 0 && setsidebar(true)
    let exempted=['/checkout','/order','/orders','/myaccount']
    if(exempted.includes(router.pathname)){
      setsidebar(false)
    }
  },[])

  // console.log(cart,addToCart,removeFromCart,subtotal,clearCart)
  const togglecart = () => {
    setsidebar(!sidebar)
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')
    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    // }
  }
  const ref = useRef()
  const [dropdown,setDropdown]=useState(false)
  const toggleDropdown=()=>{
    setDropdown(!dropdown)
  }

  return (
    <div>
      <header className={`text-gray-40 w-full z-10 fixed top-0 body-font shadow-md bg-white ${sidebar && 'overflow-hidden'}`}>
        <div className="container sticky top-0 mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <Image src={"/images/logo.jpg"} width={40} height={40} style={{ borderRadius: "40px" }} alt='' />
            <Link href={"/"} className="text-black ml-3 text-xl cursor-pointer">Coding Tshirt</Link>
          </div> 
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirt"} className="mr-5 hover:text-green-950">Tshirts</Link>
            <Link href={"/hoodies"} className="mr-5 hover:text-green-950">Hoodies</Link>
            <Link href={"/stickers"} className="mr-5 hover:text-green-950">Stickers</Link>
            <Link href={"/mugs"} className="mr-5 hover:text-green-950">Mugs</Link>
          </nav>
          <div className='flex'>
          {dropdown && <div className="absolute right-5 bg-white shadow-lg border top-14 rounded-md px-5 py-4 w-36">
            <ul>
              <Link href={"/myaccount"}><li className='font-semibold py-1 text-sm cursor-pointer hover:
              text-green-900'>My Account</li></Link>
              <Link href={"/orders"}><li className='hover:
              text-green-900 font-semibold py-1 cursor-pointer text-sm  '>My Orders</li></Link>
              <li onClick={logout} className='hover:
              text-green-900 font-semibold py-1 cursor-pointer text-sm'>Logout</li>
            </ul>
          </div> }
            <Link onClick={togglecart} href={""} className="mr-4 hover:text-green-950 text-xl my-1"><BsCart /></Link>
            {user.value && <a 
            ><MdAccountCircle onClick={toggleDropdown}className='text-2xl mr-3 cursor-pointer my-1' /></a>}

              {!user.value && <Link href={"/login"}><button className='bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-700'>Login</button></Link> }
          </div>

          
        </div>
      </header>

      <div ref={ref} className={`overflow-x-hidden overflow-y-scroll w-full md:w-72 h-full z-10 sideCart fixed top-0 text-white bg-green-100 py-10 px-8 transition-all ${sidebar ? 'right-0' : '-right-full'}`}>
        <h2 className='font-bold text-xl text-black'>Shopping Cart</h2>
        <span className='absolute top-5 right-2 cursor-pointer'><IoIosCloseCircle onClick={togglecart} className='text-3xl text-black' /></span>

        <ol className='list-decimal font-semibold text-black'>
          {Object.keys(cart).length == 0 && <div className='my-2 font-normal'>Your Cart is Empty</div>}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold text-black'>{cart[k].name}({cart[k].variant}/{cart[k].size})</div>
                <div className='flex font-semibold items-center justify-center w-1/3 text-black'>
                  <FaCircleMinus className='cursor-pointer text-red-950' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                  <span className='mx-2'>{cart[k].qty}</span>
                  <FaCirclePlus className='cursor-pointer text-red-950' onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="total text-black font-bold">Subtotal: {subtotal}</div>

        <div className='flex'>
          <Link href={"/checkout"}>
            <button disabled={Object.keys(cart).length === 0} className="disabled:bg-green-400 flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-sm">
              <IoBagCheckSharp className='m-1' />Checkout
            </button>
          </Link>
          <button disabled={Object.keys(cart).length === 0} className="disabled:bg-green-400 flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-sm" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar

