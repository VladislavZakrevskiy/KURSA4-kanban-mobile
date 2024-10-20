import { Theme } from './Theme'

export const darkTheme: Theme = {
    textSizes: {
        heading: {
            xl: 21,
            l: 18,
            m: 15,
        },
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#635FC7',
        error: '#635FC7',
        textFieldLabel: '#FFFFFF',
        textFieldPlaceholder: 'rgba(255,255,255,0.3)',
        caption: '#828FA3',
        light: '#fff',
    },

    background: {
        card: {
            primary: '#2B2C37',
            secondary: '#20212C',
        },
        button: {
            primary: {
                default: '#635FC7',
                hover: '#A8A4FF',
            },
            secondary: {
                default: '#FFFFFF',
                hover: '#FFFFFF',
            },
            error: {
                default: '#EA5555',
                hover: '#FF9898',
            },
        },
        checkbox: {
            default: '#20212C',
            checked: '#20212C',
            hover: '#635FC751',
        },
        select: {
            option: '#20212C'
        },
        modal: {
            ovarlay: '#D000',
            dialog: '#2B2C37',
        },
        paper: {
            primary: '#20212C',
            secondary: '#2B2C37',
        },
    },
}
