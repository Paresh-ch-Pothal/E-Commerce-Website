import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const orders = () => {
    const router = useRouter()
    const [orders, setorders] = useState([])
    useEffect(() => {
        const fetchorders = async () => {
            let a = await fetch(`http://localhost:3000/api/myorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token })
            })
            let res = await a.json()
            setorders(res.orders)
        }
        if (!localStorage.getItem("myuser")) {
            router.push("/")
        }
        else {
            fetchorders();
        }
    }, [])


    return (
        <div className="mt-32 mx-auto min-h-screen">
            <Head>
                <title>Your Orders :- Coding Tshirt</title>
            </Head>
            <div className='container mx-auto'>
                <h1 className='font-semibold text-2xl py-6 px-4 text-center'>My Orders</h1>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    OrderId
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {orders.map((item)=>{

                            
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.orderId}
                                </th>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={'/orders?id='+item._id}>Details</Link>
                                </td>
                            </tr> })} */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">
                                    White
                                </td>
                                <td className="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td className="px-6 py-4">
                                    $1999
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}


export default orders
