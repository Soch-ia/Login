import {motion} from "framer-motion"
// import './ModalStyles.css'

const Backdrop = ({children, onClick}) => {

    return (
        <motion.div
        
        className = 'w-full inset-0 flex bg-black/40 top-0 left-0 fixed backdrop-blur-sm items-center justify-center'
        onClick = {onClick}
        initial ={{opacity: 0}}
        animate={{opacity: 1}}
        exit ={{ opacity: 0}}
        >
            {children}
        </motion.div>
    );

};

export default Backdrop;