import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  xs: '414px',
  sm: '540px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  default: '1366px',
  xxl: '1440px',
  xxxl: '1920px',
  el: '2560px',
  exl: '3440px'
})

const colors = {
  text: {
    primary: '#1F0079',
    secondary: '#333333',
    tertiary: '#04002B',
    button: '#fff',
    error: '#FF5656',
  },
  bg: {
    primary: '#0043C0',
    input: '#fff'
  },
  other: {
    card: {
      boxShadow: '4px 4px 0px rgba(0, 67, 192, 0.42)',
      border: '#E6F8FF'
    }
  }
}


const theme = extendTheme({
  breakpoints,
  colors,
})

export default theme
