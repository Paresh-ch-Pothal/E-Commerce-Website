import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const myaccount = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [address, setaddress] = useState('')
  const [disabled, setdisabled] = useState(true)
  const [user, setuser] = useState({ value: null })

  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [npassword, setnpassword] = useState('')

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
  }

  const handlesubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode }
    let a = await fetch("http://localhost:3000/api/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json();
    // console.log(res)
    toast.success("Successfully Updated Details", {
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

  const handlePasswordsubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword }
      let a = await fetch("http://localhost:3000/api/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      })
      res = await a.json();
    }
    else{
      res={success: false}
    }
    // console.log(res)
    if (res.success) {
      toast.success("Successfully Updated Password", {
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
    else {
      toast.error("Error Updating Password", {
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
    setpassword('')
    setcpassword('')
    setnpassword('')
  }

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
    else if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setpincode(e.target.value)

    }
    else if (e.target.name == "address") {
      setaddress(e.target.value)

    }
    else if (e.target.name == "password") {
      setpassword(e.target.value)
    }
    else if (e.target.name == "cpassword") {
      setcpassword(e.target.value)
    }
    else if (e.target.name == "npassword") {
      setnpassword(e.target.value)
    }

  }
  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/")
    }

    if (myuser && myuser.token) {
      setuser(myuser)
      setemail(myuser.email)
      fetchdata(myuser.token)
    }
  }, [])
  return (
    <div className='mt-32 mx-auto mb-32 container min-h-screen'>
      <Head>
        <title>My Account :- Coding Tshirt</title>
      </Head>
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
      <h1 className='text-3xl text-center font-bold'>Update Your Account</h1>
      <h2 className='ml-3 font-bold text-xl'>1. Delivery Details</h2>
      <div className='mx-auto flex my-4'>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (Cannot be Updated)</label>

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


      <button onClick={handlesubmit} className="disabled:bg-green-200 flex mb-5 ml-2 my-2 text-white bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-md">Submit</button>


      <h2 className='ml-3 font-bold text-xl'>2. Change Password</h2>
      <div className='mx-auto flex my-4'>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
            <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
            <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>


        
      </div>
      <button onClick={handlePasswordsubmit} className="disabled:bg-green-200 flex ml-2 text-white bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded text-md">Submit</button>
    </div>

  )
}



export default myaccount
