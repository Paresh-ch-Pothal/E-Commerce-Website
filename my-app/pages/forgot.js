import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head';


const forgot = () => {
  const router = useRouter();
  console.log(router.query)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

  const resetPassword = async () => {
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
      }
      let a = await fetch(`http://localhost:3000/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let res = await a.json()
      if (res.sucess) {
        console.log("Password has been changed")
      }
      else {
        console.log("Error")
      }
    }
  }

  const sendResetEmail = async () => {
    let data = {
      email, sendMail: true,
    }
    let a = await fetch(`http://localhost:3000/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    if (res.sucess) {
      console.log("Password reset instructions is sent to you")
    }
    else {
      console.log("Error")
    }
  }

  const handleChange=(e)=>{
    if(e.target.name == "password"){
      setpassword(e.target.value)
    }
    else if(e.target.name == "email"){
      setemail(e.target.value)
    }
    else if(e.target.name == "cpassword"){
      setcpassword(e.target.value)
    }
  }


  return (
    <>
      <Head>
        <title>Forgot Password :- Coding Tshirt</title>
      </Head>
      <div>
        <div className="flex min-h-screen flex-1 flex-col items-start justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto" style={{ borderRadius: "20px" }}
              src="/images/logo.jpg"
              alt="Your Company"
            />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          {router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input onChange={handleChange} value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input onChange={handleChange} value={cpassword}
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autoComplete="cpassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>


              </div>
              <div>
                <button onClick={resetPassword}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Continue
                </button>
              </div>
            </form>
            {password !== cpassword && <span className='text-red-700'>Password does not match</span>}
            {password && password === cpassword && <span className='text-green-700'>Password match</span>}
          </div>}


          {!router.query.token && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input onChange={handleChange} value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button onClick={sendResetEmail}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Continue
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>}
        </div>
      </div>
    </>
  )
}

export default forgot
