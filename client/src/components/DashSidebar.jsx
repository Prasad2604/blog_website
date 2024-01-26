import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useLocation,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useSelector} from 'react-redux'

export default function DashSidebar() {
    const {currentUser} = useSelector(state=>state.user);
    const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      // console.log(tabFromUrl);
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.username} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
