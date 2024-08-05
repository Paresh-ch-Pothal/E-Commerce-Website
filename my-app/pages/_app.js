import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'
import dotenv from 'dotenv';
dotenv.config();

export default function App({ Component, pageProps }) {

  const [cart, setcart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const router = useRouter();
  const [user, setuser] = useState({ value: null, email: null })
  const [key, setkey] = useState()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // console.log("This is UseEffect")
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }

    } catch (error) {
      console.error(error);
      localStorage.clear()
    }

    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setuser({ value: myuser.token, email: myuser.email })
    }
    setkey(Math.random())


  }, [router.query])

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart))
    let subt = 0
    let keys = Object.keys(mycart)
    if (keys.length == 0) {
      setSubtotal(0)
      return;
    }
    for (let i = 0; i < keys.length; i++) {
      subt = subt + mycart[keys[i]].price * mycart[keys[i]].qty
    }
    setSubtotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    if (Object.keys(cart).length == 0) {
      setkey(Math.random())
    }

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setcart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setcart({})
    saveCart({})
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {}
    newCart[itemCode] = { qty: 1, price, name, size, variant };
    setcart(newCart)
    saveCart(newCart)
    router.push("/checkout");
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
  }

  const logout = () => {
    localStorage.removeItem("myuser");
    setkey(Math.random())
    setuser({ value: null })
    router.push("/")
  }

  return (
    <>
      <LoadingBar
        color='#22c55e'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />}
      <Component  {...pageProps} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
      <Footer />
      {/* <Script src="https://cdn.tailwindcss.com"></Script> */}
    </>
  )
}
