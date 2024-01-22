import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitterX,BsLinkedin,BsGithub} from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                {/* logo */}
                    <div className="mt-5">
                        <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Prasad's</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div >
                        <Footer.Title title='About'/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='https://www.youtube.com' 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    >
                                        You Tube
                                </Footer.Link>
                                <Footer.Link 
                                    href='/about' 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    >
                                        Prasad's Blog
                                </Footer.Link>
                                    
                                
                            </Footer.LinkGroup>
                        </div>
                        <div >
                        <Footer.Title title='Connect With Me'/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='https://github.com/Prasad2604' 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    >
                                        GitHub
                                </Footer.Link>
                                <Footer.Link 
                                    href='https://www.linkedin.com/in/prasad-gujar-340887287/' 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    >
                                        LinkedIn
                                </Footer.Link>
                                <Footer.Link 
                                    href='https://twitter.com/pg_0409' 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    >
                                        Twitter
                                </Footer.Link>
                                    
                                
                            </Footer.LinkGroup>
                        </div>
                        <div >
                        <Footer.Title title='Legal'/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                    href='#' 
                                    
                                    >
                                        Privacy Policy
                                </Footer.Link>
                                <Footer.Link 
                                    href='#' 
                                    
                                    >
                                        Terms & Conditions
                                </Footer.Link>
                                    
                                
                            </Footer.LinkGroup>
                        </div>
                      
                    </div> 
            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by="Prasad's Blog" year={new Date().getFullYear()}/>
            
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='#' icon={BsTwitterX}/>
                <Footer.Icon href='#' icon={BsLinkedin}/>
                <Footer.Icon href='#' icon={BsGithub}/>
            </div>
            </div>
        </div>
    </Footer>
  )
}
