import {motion} from "framer-motion"
import React from "react"

const AnimationWrapper = ({children}) =>{
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="mt-4"
        >
            {children}
        </motion.div>
    )
}

export default AnimationWrapper