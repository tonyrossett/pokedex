import { createContext, useState } from 'react'

export const themes = {
    light: {
        color: 'var(--dark)',
        background: 'var(--light)'
    },
    dark: {
        color: 'var(--light)',
        background: 'var(--dark)'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {
    const [ theme, setTheme ] = useState (themes.light)    
    
    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
