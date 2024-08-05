import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function login() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password };
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    console.log(json.email)
    if (json.success) {
      localStorage.setItem("myuser", JSON.stringify({"token": json.token, "email": json.email}));
      toast.success('🦄 You are successfully login', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      setTimeout(() => {
        router.push("/")
      }, 1500);
      
    }
    else {
      toast.error('🦄 Please provide Correct information', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
    // console.log(json);
    setemail('')
    setpassword('')

  }

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value)
    }
    else if (e.target.name == "password") {
      setpassword(e.target.value)
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("myuser")){
      router.push("/")
    }
  },[])


  return (
    <div className='mt-24'>
      <Head>
        <title>Login :- Coding Tshirt</title>
      </Head>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto" style={{ borderRadius: "20px" }}
            src="/images/logo.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <div className='text-center'>
            <Link href={"/signup"} className='font-medium text-xl text-center underline hover:text-green-950'>Or SignUp</Link>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input value={email} onChange={handleChange}
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/forgot" className="font-semibold text-green-600 hover:text-green-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input value={password} onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
