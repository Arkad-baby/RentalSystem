
import React from 'react'
import Login from './LogIn'
import SignUp from './SignUp'


const HomePage = () => {
  return (
    <div >
      <div className='!w-[800px] overflow-hidden flex flex-col justify-center items-center '>

    <SignUp/>
    <div className='mt-10'>
      <Login/>
    </div>
      </div>
      </div>
  )
}

export default HomePage