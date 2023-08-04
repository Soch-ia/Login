import React, {useState} from 'react'
// import './LoginStyles.css'
import A_black_image from './assets/A_black_image.jpg'
import home from './assets/DSC08227.jpg'

import classNames from 'classnames'

import {BiLowVision} from 'react-icons/bi'
import { Navigate, useNavigate } from 'react-router-dom'

import {motion, AnimatePresence} from "framer-motion"
import Modalv2 from './Modalv2'
import Modalv3 from './Modalv3'

import axios from 'axios'



function Login() {
    

    const navigate = useNavigate()
    
    const [isToggled, toggle] = useState(false)
    const[modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    
    const callback = () => {
        if (isToggled == true) {
            toggle(false);
            
        } else {
            toggle(true);
            
        } 

        console.log(isToggled)
        
    }

    const handleClick = () => {
        
        navigate("/signup")
        
    }
 
    const loginClick = (e) => {
        
        e.preventDefault()
        
        console.log("email:", email)
        console.log("password: ", password)
        
        if (isToggled == true) {
                
            var checkMethod = 0;

        } else {
            
            var checkMethod = 1;
        } 

        axios.post('http://localhost:8081/test', {        
            email: email,
            password: password,
            checkMethod: checkMethod

          })
          .then(res=> {
            
            console.log(res.data.valid);

            if (res.data.valid == 1) {
                modalOpen ? close() : open()
            } else {
                console.log("err")
            }
            
          }).catch(err => console.log(err));


        

    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ inputType, setInputType ] = useState('password')

    // const pwVisibility = () => {
        
    //     if (inputType === 'password') {
    //         setInputType('text');
    //     } else {
    //         setInputType('password');
    //     }        
        
    // }

    const bigBox = {
        hidden: {
            opacity: 0,
            y:'10px',
        },
        show: {
            opacity: 1,
            y:0,
            transition: {                
                duration: 2,
                ease: 'easeInOut',
            }
        }

    }

    const titleWord = {
        hidden: {
            opacity: 0,  
        },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 2.5,
                staggerChildren: 0.4,
                ease: 'easeInOut',
            }
        }

    }

    const titleLetter = {
        hidden: {
            opacity: 0,   
        },
        show: {
            opacity: 1,   
            transition: {
                
                ease: 'easeInOut',
            }
        }

    }

    const fields = {
        hidden: {
            opacity: 0,
            x: '-30px'   
        },
        show: {
            opacity: 1,
            x: 0,   
            transition: {
                delay:2,
                duration: 2,
                ease: 'easeInOut',
            }
        }

    }

    const atoggle = {
        hidden: {
            opacity: 0,
            x: '-30px'   
        },
        show: {
            opacity: 1,
            x: 0,   
            transition: {
                delay:3,
                duration: 1.5,
                ease: 'easeInOut',
            }
        }

    }

    const buttons = {
        hidden: {
            opacity: 0,
            y: '30px'   
        },
        show: {
            opacity: 1,
            y: 0,   
            transition: {
                delay:4,
                duration: 1.5,
                ease: 'easeInOut',
            }
        }

    }

    return(
        <div className =' bg-slate-50'>      
            <div className = {classNames('w-full h-screen flex', {'bg-black/40 top-0 left-0 absolute ':modalOpen,
             })} >
                <motion.div className = 'animate-float grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] bg-white'
                variants={bigBox} initial= "hidden" animate= "show">
                    <div className = 'w-full h-[550px] hidden md:block'>
                        <motion.img className = 'w-full h-full' src = {home} alt = "/" 
                        variants = {bigBox} initial= "hidden" animate= "show"/>
                    </div>
                    <div className='p-16 flex flex-col justify-around'>
                        <div>
                            <motion.h2 className = 'text-4xl font-bold text-center mb-8 font-poppins'
                            variants = {titleWord} initial="hidden" animate="show"> 
                            {
                                Array.from("LOGIN").map((word,i)=> (
                                    <motion.span key={i} variants = {titleLetter}>{word}</motion.span>
                                ))
                            }

                            </motion.h2>
                            <div className=' flex flex-col justify-around'>
                                <motion.input className = 'border-b p-2 focus:outline-none font-poppins' type = "text" placeholder = 'Email'
                                value = {email} onChange={(ev) => setEmail(ev.target.value)}
                                variants = {fields} initial="hidden" animate="show"/>

                                <div className ='p-4'></div>

                                <motion.input className='border-b p-2 focus:outline-none font-poppins' type = "password" placeholder = 'Password'
                                value = {password} onChange={(e) => setPassword(e.target.value)}
                                variants = {fields} initial="hidden" animate="show"/>
                            </div>
                            <motion.div className ='p-10 flex flex-row justify-around'
                            variants = {atoggle} initial="hidden" animate="show">
                
                                <p className = {classNames('text-right font-poppins transition-all duration-500' , {
                                    'text-zinc-400': isToggled,
                                })}>Email</p>

                                <div onClick = {callback} 
                                className = 'flex w-10 h-5 bg-gray-200 rounded-full'>
                                    
                                    <span
                                    className = {classNames('h-5 w-5 bg-slate-400 rounded-full transition-all duration-500 shadow-lg', {
                                        'bg-slate-600 ml-5': isToggled,
                                    })} />
                                </div>

                                <p className = {classNames('text-right font-poppins transition-all duration-500', {
                                    'text-zinc-400': !isToggled,
                                })}>TOTP</p>

                            </motion.div>

                            <AnimatePresence
                            // Disable any initial animations on children that
                            // are present when the component is first rendered
                            initial={false}
                            // Only render one component at a time.
                            // The exiting component will finish its exit
                            // animation before entering component is rendered
                            mode="wait"
                            // Fires when all exiting nodes have completed animating out
                            onExitComplete={() => null}
                            >
                            {modalOpen && isToggled && <Modalv3 modalOpen={modalOpen} handleClose={close} email = {email} password = {password}/>}
                            {modalOpen && !isToggled && <Modalv2 modalOpen={modalOpen} handleClose={close} email = {email} password = {password}/>}
                            
                            </AnimatePresence>

                            <div className='flex flex-col justify-around'>
                            <motion.button className='w-full py-2  bg-stone-100 hover:bg-slate-200 hover:shadow-md font-poppins shadow rounded-xl'
                            onClick = {loginClick} variants = {buttons} initial="hidden" animate="show">Login</motion.button>

                            <motion.button className='w-full py-2 mt-4 bg-stone-100 hover:bg-slate-200 hover:shadow-md font-poppins shadow rounded-xl'
                            onClick = {handleClick} variants = {buttons} initial="hidden" animate="show">Sign Up</motion.button>
                            </div>

                        </div>
                        
                    </div>
                </motion.div> 
                
            </div>
        </div>
    )
}


export default Login
