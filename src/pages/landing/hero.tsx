import { Button } from '@components/Button';
import React from 'react';

function Hero() {
  return (
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center h-[33rem]'>
    <div className='flex justify-end p-12'>
        <div>
        <div className=''>
        <div className=''>
            <h3 className='text-white font-bold text-[#398AB9] text-hero leading-large'>DAO FOR THE PEOPLE</h3>
            <p className='text-white  mt-12 text-sub leading-mid'>Making the right decisons for the people and helping<br/> businesses.</p>
        </div>
    </div>
    <div className='space-y-32'>
            <Button size='small' backgroundColor='#398AB9' label="Business Funding"/>
            <Button size='small' backgroundColor='#fff'  label="Become an Investor"/>
        </div>
        </div>
    </div>
</div>
  )
}

export default Hero