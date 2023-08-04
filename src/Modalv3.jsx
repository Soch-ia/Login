import {motion} from "framer-motion"
import Backdrop from "./Backdrop"
import './ModalStyles.css'
import {useState, useEffect} from "react"
import axios from "axios"
import { QRCodeSVG } from "qrcode.react"


const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 50,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
        transition: {
            duration: 1,
        }
    },
    
};

const Modalv3 = ({handleClose, email, password}) => {
    
    const [token, setToken] = useState('');

    const limitChar = (e) => {
        setToken(e.target.value.slice(0, 6));
    }

    const checkToken = () => {
        console.log(token)
        console.log("email: ", email)
        console.log("password: ", password)
        axios.post('http://18.141.50.171/totp', {        

            email: email,
            password: password,
            token: token

          })
          .then(res=> {

            console.log(res.data.viable);

            if (res.data.viable == 1) {
                alert("yes!")
            } else {
                alert("no!")
            }
            
          }).catch(err => console.log(err));

    }

    return(
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick = {(e) => e.stopPropagation()}
                className = "flex justify-center"
                variants={dropIn}
                initial = "hidden"
                animate = "visible"
                exit = "exit"
            >
                <div className = "flex flex-col bg-white rounded-xl p-10">
                    
                    <div>
                    <p className = "text-3xl font-bold text-center mb-8 font-poppins text-zinc-700"> 
                    Token Verification</p>

                    </div>
                    <div className = "p-4"/>
                    <div className = "flex flex-row justify-around">

                    

                    <input type = "number" className = "focus:outline-none font-poppins text-center text-2xl border-b w-1/2" value = {token} onChange={limitChar}/>

                    

                    </div>
                    
                    <div className = "p-4"/>
                    
                    <div className = "flex flex-row justify-center">
                    <button className = "font-poppins text-center text-xl mt-10 text-zinc-700 hover:-translate-y-1 hover:text-zinc-950 transition-all delay-75 duration-500 w-1/4" onClick={checkToken}>Submit</button>
                    </div>
                    

                </div>


                

                

            </motion.div>

        </Backdrop>
    );
};

export default Modalv3