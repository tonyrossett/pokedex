import { useContext } from 'react'
import styles from '../Container/Container.module.css'
import { ThemeContext } from '../../contexts/theme-context'

function Container ({ children }) {
    const { theme } = useContext(ThemeContext)
    return (
        <section className={styles.container} style={{color: theme.color, backgroundColor: theme.background, minHeight: '100vh'}}>
            { children }
        </section>
    )
}

export default Container
