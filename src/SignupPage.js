import {BiLowVision} from 'react-icons/bi'
import {useState} from 'react';
import { useEffect } from 'react';
import {motion, AnimatePresence} from "framer-motion"
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modalv4 from './Modalv4'
import home from './assets/DSC08079.jpg'
import classNames from 'classnames'



function SignUp() {



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const navigate = useNavigate()   
  
  const[modalOpen, setModalOpen] = useState(false);
  const close = () => {
    setModalOpen(false);
    navigate("/");
  };
  const open = () => setModalOpen(true);

  const [qr, setQR] = useState('');
  const [uri, setURI] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:3000/signup/'
  })
  
    useEffect(() => {

    }, [])


  const handleClick = (e) => {
  

    e.preventDefault()


    axios.post('http://localhost:8081/create', {
      name: name,
      email: email,
      password: password
    })
    .then(res=> {
      alert("Data Added Successfully!");
      
      
      setQR(res.data.sqlQR);
      setURI(res.data.sqlURI);



      modalOpen ? close() : open();
      
      // navigate("/");
    }).catch(err => console.log(err));
      

  }

  const [ inputType, setInputType ] = useState('password')

  const pwVisibility = () => {
      
      if (inputType === 'password') {
          setInputType('text');
          
      } else {
          setInputType('password');
      }        
      
  } 

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

  const fieldsContainer = {
    hidden: {
        opacity: 0,
        x: '-30px'   
    },
    show: {
        opacity: 1,
        x: 0,   
        transition: {
            delayChildren:2,
            staggerChildren: 0.5,
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
              delay:3.5,
              duration: 1.5,
              ease: 'easeInOut',
          }
      }

  }

  return (
    <div className = 'bg-slate-50'>
        <div className = {classNames('w-full h-screen flex', {'bg-black/40 top-0 left-0 absolute ':modalOpen,
        })}>
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
                                Array.from("SIGN UP").map((word,i)=> (
                                    <motion.span key={i} variants = {titleLetter}>{word}</motion.span>
                                ))
                            }

                            </motion.h2>
                            <motion.div className=' flex flex-col justify-around' variants = {fieldsContainer} initial="hidden" animate="show">

                                <motion.input className = 'border-b p-2 focus:outline-none font-poppins' type = "text" placeholder = 'Name'
                                value = {name} onChange={(ev) => setName(ev.target.value)}
                                variants = {fields} /> 

                                <div className ='p-4'></div>

                                <motion.input className = 'border-b p-2 focus:outline-none font-poppins' type = "text" placeholder = 'Email'
                                value = {email} onChange={(e) => setEmail(e.target.value)}
                                variants = {fields} />

                                <div className ='p-4'></div>

                                <motion.input className='border-b p-2 focus:outline-none font-poppins' type = "password" placeholder = 'Password'
                                value = {password} onChange={(eve) => setPassword(eve.target.value)}
                                variants = {fields} />
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
                            {modalOpen && <Modalv4 modalOpen={modalOpen} handleClose={close} qr = {qr} uri = {uri}/>}
                            
                            
                            </AnimatePresence>

                            <div className='flex flex-col justify-around'>
                            

                            <motion.button className='w-full py-2 mt-8 bg-stone-100 hover:bg-slate-200 hover:shadow-md font-poppins shadow rounded-xl'
                            onClick = {handleClick} variants = {buttons} initial="hidden" animate="show">Sign Up</motion.button>
                            </div>

                        </div>
                        
                    </div>
                </motion.div> 
                
            </div>
        </div>

        

    )
  }




  

  export default SignUp;
  