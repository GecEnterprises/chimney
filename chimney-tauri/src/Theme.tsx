import { DefaultTheme } from 'styled-components'

export interface CustomTheme extends DefaultTheme {
  mode: 'light' | 'dark'
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
    error: string
    success: string
    warning: string
    info: string
    border: string
    borderSecondary: string
    hover: string
  }
}

const lightTheme: CustomTheme = {
  mode: 'light',
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333',
    accent: '#17a2b8',
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    info: '#17a2b8',
    border: '#dee2e6',
    borderSecondary: '#e9ecef',
    hover: '#e9ecef',
  },
}

const darkTheme: CustomTheme = {
  mode: 'dark',
  colors: {
    primary: '#0056b3',
    secondary: '#495057',
    background: '#121212',
    text: '#e0e0e0',
    accent: '#138496',
    error: '#c82333',
    success: '#218838',
    warning: '#e0a800',
    info: '#138496',
    border: '#495057',
    borderSecondary: '#2c2c2c',
    hover: '#2c2c2c',
  },
}

export const theme = {
  light: lightTheme,
  dark: darkTheme,
}

export default theme
