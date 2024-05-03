import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import styles from "../Button/Button.module.css"

export const Button = (props) => {
    const {theme} = useContext(ThemeContext)
    
    return (
        <button {...props} className={styles.toggler}
        style={{color: theme.color, backgroundColor: theme.background}}
        />
    )
}