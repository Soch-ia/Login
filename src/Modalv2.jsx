import {motion} from "framer-motion"
import Backdrop from "./Backdrop"
import './ModalStyles.css'
import {useState} from "react"
import axios from "axios"


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

const Modalv2 = ({handleClose, email, password}) => {
    
    const [code, setCode] = useState('');
    
    const limitChar = (e) => {
        setCode(e.target.value.slice(0, 6));
    }

    const checkCode = () => {
        console.log(code)
        console.log("email: ", email)
        console.log("password: ", password)
        axios.post('http://localhost:8081/code', {        

            email: email,
            password: password,
            code: code

          })
          .then(res=> {

            console.log(res.data.validity);

            if (res.data.validity == 1) {
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
                Email Verification</p>

                </div>
                <div className = "p-4"/>
                <div className = "flex flex-row justify-around">

                

                <input type = "number" className = "focus:outline-none font-poppins text-center text-2xl border-b w-1/2" value = {code} onChange={limitChar}/>

                

                </div>
                
                <div className = "p-4"/>
                
                <div className = "flex flex-row justify-center">
                <button className = "font-poppins text-center text-xl mt-10 text-zinc-700 hover:-translate-y-1 hover:text-zinc-950 transition-all delay-75 duration-500 w-1/4" onClick={checkCode}>Submit</button>
                </div>
                

            </div>


            

            

        </motion.div>

    </Backdrop>
    );
};

export default Modalv2