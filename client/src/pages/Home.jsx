import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts,setPosts] = useState([]);
  
  // console.log(posts);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const res = fetch(`/api/post/getposts`)
        const data = (await res).json();
        if(!res.ok){
          console.log(data.message);
          return;
        }
        if(res.ok){
          setPosts(data.posts);
        }
      } catch (error) {
          console.log(error.message);
      }
    }
    fetchPosts();
  },[]);

  return (
    <div>
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and 
        tutorials on topic such as web development,
        software engineering, and programming languages.</p>
      <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
    </div>
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      {
        posts && posts.length>0 && 
        <div className="">

          <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
          {/* <div className="">
            {posts.map((post)=>(
              
            )

            )}
          </div> */}
        </div>
        
      }
    </div>
  </div>
    
  )
}
