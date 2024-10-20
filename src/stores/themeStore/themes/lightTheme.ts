import { Theme } from './Theme'

export const lightTheme: Theme = {
    textSizes: {
        heading: {
            xl: 21,
            l: 18,
            m: 15,
        },
    },
    text: {
        light: '#FFFFFF',
        caption: '#828FA3',
        error: '#EA5555',
        primary: '#000112',
        textFieldLabel: '#828FA3',
        textFieldPlaceholder: 'rgba(0,0,0,0.3)',
        secondary: '#635FC7',
    },
    background: {
        button: {
            error: {
                default: '#EA5555',
                hover: '#FF9898',
            },
            primary: {
                default: '#635FC7',
                hover: '#635FC740',
            },
            secondary: {
                default: '#635FC71A',
                hover: '#FFFFFF',
            },
        },
        checkbox: {
            default: '#F4F7FD',
            checked: '#F4F7FD',
            hover: '#635FC751',
        },
        select: {
            option: '#FFFFFF'
        },
        card: {
            primary: '#FFFFFF',
            secondary: '#F4F7FD',
        },
        modal: {
            ovarlay: '#D3000000',
            dialog: '#FFFFFF',
        },
        paper: {
            primary: '#F4F7FD',
            secondary: '#FFF',
        },
    },
}
