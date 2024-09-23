import React from 'react'

export default function Pros() {
  return (
    <>
    <div className='bg-gradient-to-r from-yellow-100 to-green-500 py-12 px-4'>
    {/* Title Section */}
    <div className='text-center'>
    <h1 className='font-bold text-center text-green-800 text-6xl bg-green-200 rounded-lg p-4 mb-8 inline-block '>
        How it works?
    </h1>
    </div>

    {/* Steps Section */}
    <div className='bg-green-200 rounded-xl p-8 max-w-4xl mx-auto'>
        <div className='space-y-6'>
            <p className='font-semibold text-2xl text-center text-green-600'>
                1. <strong>Sign Up & Create Your Profile</strong>: Farmers and buyers can easily sign up and create a profile tailored to their needs.
            </p>
            <p className='font-semibold text-2xl text-center text-green-600'>
                2. <strong>Connect & Negotiate</strong>: Use our platform to discover potential partners and establish secure contracts.
            </p>
            <p className='font-semibold text-2xl text-center text-green-600'>
                3. <strong>Deliver & Get Paid</strong>: Farmers deliver the produce as per the contract and receive timely payments.
            </p>
        </div>
    </div>
</div>
    </>
  )
}
