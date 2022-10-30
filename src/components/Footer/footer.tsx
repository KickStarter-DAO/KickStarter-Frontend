import Link from 'next/link';
import React from 'react';
import { footerLink } from '../../../static';
Link

function Footer() {
  return (
    <footer className='bg-[#F4F6FE] mt-32 flex justify-between p-8'>
        <div>
            <p className='text-[#495371]'>Copyright 2022</p>
            <p className='text-[#495371] font-bold'>KickstarterDao</p>
        </div>
        <ul className='flex items-center space-x-12'>
            {
                footerLink.map((item,idx) =>{
                    return(
                        <li className='text-[#495371]'><Link href={item.value}>{item.name}</Link></li>
                    )
                })
            }
        </ul>
    </footer>
  )
}

export default Footer