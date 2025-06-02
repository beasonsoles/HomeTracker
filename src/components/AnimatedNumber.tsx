import { motion } from "framer-motion"

type Props = {
    value: number
}

const AnimatedNumber: React.FC<Props> = ({ value }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-bold text-6xl"
        >
            {value}
        </motion.span>
    )
}

export default AnimatedNumber
