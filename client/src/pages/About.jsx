import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Prasad's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>Hello and welcome to Prasad's Blog!</p>
            <p>I'm Prasad Gujar, the creator and curator behind this space. As a passionate learner exploring the realms of web development, I embarked on a journey to master the MERN (MongoDB, Express.js, React, Node.js) stack. Along the way, I decided to document my experiences, insights, and discoveries in the form of this blog.</p>
            <p>Prasad's Blog is not just a coding diary; it's a reflection of my growth, challenges, and triumphs in the vast world of MERN stack development. Whether you're a fellow enthusiast, a budding developer, or someone simply curious about the technology landscape, this blog aims to provide valuable content that is both informative and engaging.</p>
            <p>Feel free to connect with me on social media. I'm active on <a href='https://twitter.com/pg_0409' target='_blank' className='hover:underline text-teal-500'>Twitter</a> and <a href='https://www.linkedin.com/in/prasad-gujar-340887287/' target='_blank' className='hover:underline text-teal-500'>LinkedIn</a>. Your feedback and suggestions are not just welcome; they are essential in shaping the future content of this blog.</p>
            <p>Thank you for visiting Prasad's Blog. I hope you find inspiration, knowledge, and a sense of camaraderie as you navigate the exciting world of MERN stack development with me.</p>
            <p>Happy coding!</p>
            <p>Prasad Gujar</p>
          </div>
        </div>
      </div>
    </div>
  )
}
