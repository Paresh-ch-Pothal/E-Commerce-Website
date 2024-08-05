import React from 'react'
import Link from 'next/link';
import Product from "@/models/product";
import mongoose from "mongoose"
import Head from 'next/head';

const stickers = (props) => {
  const productSlug = "example-product-stickers";
  return (
    <div>
      <Head>
        <title>Stickers :- Coding Tshirt</title>
      </Head>
      <section className="text-gray-600 body-font ml-10 mr-10 mt-24 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 mx-5">
            {Object.keys(props.products.length === 0) && <p>Sorry all the stickers are not available(OUT OF STOCK). New stock is coming soon... Stay Tuned</p>}

            {Object.keys(props.products).map((item) => {
              return (
                <div key={props.products[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg">
                  <a href={`/product/${props.products[item].slug}`} className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={props.products[item].img} />
                  </a>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.products[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{props.products[item].title}</h2>
                    <p className="mt-1">{props.products[item].price}</p>
                    <div className='mt-1'>
                      {props.products[item].size.includes('S') && <span className="border border-gray-300 px-1 mx-1">S</span>}
                      {props.products[item].size.includes('M') && <span className="border border-gray-300 px-1 mx-1">M</span>}
                      {props.products[item].size.includes('L') && <span className="border border-gray-300 px-1 mx-1">L</span>}
                      {props.products[item].size.includes('XL') && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                      {props.products[item].size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                      {props.products[item].size.includes('XXXL') && <span className="border border-gray-300 px-1 mx-1">XXXL</span>}
                    </div>
                    <div className='mt-1'>
                      {props.products[item].color.map((color, index) => (
                        <button key={index} className={`border-2 border-gray-300 ml-1 bg-${color}-700 rounded-full w-6 h-6 focus:outline-none`}></button>
                      ))}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = (async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  const products = await Product.find({ category: "stickers" })
  let stickers = {}
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }

    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
        stickers[item.title].size = [item.size]
      }
    }
  }
  return { props: { products: JSON.parse(JSON.stringify(stickers)) } }
})

export default stickers