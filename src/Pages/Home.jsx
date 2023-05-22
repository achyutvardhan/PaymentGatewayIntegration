import React from 'react'
import './Home.css'
import ph from '../assets/download.jpg'
export default function Home() {
   const loadscript= (src)=>{
    

   }
    const displayRazorpay = async()=>{
            const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js")

    }

  return (
    <>
    <h1>This is simple integration of payment gateway</h1>
    <div className="external-container">
        <div className="internal-container">

            <div className="product-ex">
                <div className='product-int'>

                    <div className='image'><img src={ph} alt="" /></div>
                    <div className="price">Rs10</div>
                    <button onClick={displayRazorpay} >buy</button>
                </div>
            </div>

            
            <div className="product-ex">
                <div className='product-int'>

                    <div className='image'><img src={ph} alt="" /></div>
                    <div className="price"> Rs10</div>
                    <button onClick={displayRazorpay} >buy</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
