import React from 'react'

const Footer = () => {

    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
            <div className="logo font-bold text-white text-2xl cursor-pointer">
                <span className='text-blue-700'>&lt;</span>
                Pass
                <span className="text-blue-700">OP /&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='w-5 mx-1' src="heart.png" alt="" /> by NoobProgrammer
            </div>
        </div>
    )
}

export default Footer
