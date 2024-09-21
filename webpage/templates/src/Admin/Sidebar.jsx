import React, { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';

function Sidebar() {
    const [status,setStatus]=useState(false)
  return (
    <div>
        <div className='flex justify-between p-5'>
            <div className='ml-5'>
                <a href=''>Amazon</a>
            </div>
            <div>
                <ul className='hidden md:flex space-x-5'>
                 <li><a href=''>Home</a></li>
                 <li><a href=''>About us</a></li>
                 <li><a href=''>Contact us</a></li>
                 <li><a href=''>profile</a></li>
                 <li><a href=''>add items</a></li>
                </ul>
                <AiOutlineBars className='left-1 absolute top-5 cursor-pointer' size={ '25px'} onClick={()=>setStatus(true)}/>
            </div>
        </div>
        {
            status?
            <div className='bg-black/70 absolute w-full h-screen flex top-0'>
                <div className='z-10 bg-white w-[240px] h-screen'>

                    <div className='flex '>
                    <a href=''>Amazon</a>
                    <AiOutlineBars className='flex top-5 left-52 absolute cursor-pointer' size={ '25px'} onClick={()=>setStatus(false)}/>
                    </div>

                     <div>
                       <ul >
                          <li><a href=''>Home</a></li>
                          <li><a href=''>About us</a></li>
                          <li><a href=''>Contact us</a></li>
                          <li><a href=''>profile</a></li>
                          <li><a href=''>add items</a></li>
                       </ul>
                     </div>

                 </div>

            </div>:
            null
        }
    </div>
  )
}

export default Sidebar