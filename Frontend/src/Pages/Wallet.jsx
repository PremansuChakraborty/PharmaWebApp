import React from 'react'
import Loader from '../component/Loader'

const Wallet = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-2xl">My Wallet</h1><br/>
      <h1 className="font-bold text-1.5xl">Available Balance: 0</h1><br/>
      <h1 className="font-bold text-1.5xl">Payment History: </h1>
      <Loader/>
    </div>
  )
}

export default Wallet
