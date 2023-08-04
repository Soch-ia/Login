import {motion} from "framer-motion"
import Backdrop from "./Backdrop"
import './ModalStyles.css'
import { QRCodeSVG } from "qrcode.react"


const dropIn = {
    hidden: {
        y: "-50vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 2,
            type: "spring",
            damping: 50,
            stiffness: 500,
        }
    },
    exit: {
        y: "50vh",
        opacity: 0,
        transition: {
            duration: 1,
        }
    },
    
};

const Modalv4 = ({handleClose, qr, uri}) => {

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
                    QR Verification</p>

                    </div>

                    <div className = "flex flex-row">

                    <p className = "font-poppins w-1/2 text-center text-lg mb-2 text-zinc-700">All</p>

                    <div className = "p-2"/>

                    <p className = "font-poppins w-1/2 text-center text-lg mb-2 text-zinc-700">Google</p>

                    </div>
                    
                    <div className = "flex flex-row">

                        <QRCodeSVG className = "w-1/2 p-2" value = {uri}/>

                        <div className = "p-2"/>

                        <img className = "w-1/2 h-[120px] mt-1.5" src={qr}></img>

                    </div>
                    
                    <div className = "flex flex-row justify-center">
                    <button className = "font-poppins text-center text-lg mt-6 text-zinc-700 hover:-translate-y-1 hover:text-zinc-950 transition-all delay-75 duration-500 w-1/5" onClick={handleClose}>Okay</button>
                    </div>
                    

                </div>


                

                

            </motion.div>

        </Backdrop>
    );
};

export default Modalv4