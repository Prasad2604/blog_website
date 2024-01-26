import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useLocation,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { signOutStart,signOutSuccess,signOutFailure } from '../redux/user/userSlice'

export default function DashSidebar() {
    const {currentUser} = useSelector(state=>state.user);
    const location = useLocation();
    const [tab,setTab] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      // console.log(tabFromUrl);
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search])


    const handleSignOut = async ()=>{
      try {
        dispatch(signOutStart());
        const res = await fetch('/api/user/signout',{
          method:'POST',
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(signOutFailure(data.message));
        }
        else{
          dispatch(signOutSuccess(data));
        }
      } catch (error) {
        dispatch(signOutFailure(error.message));
      }
    }

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.username} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                    <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
