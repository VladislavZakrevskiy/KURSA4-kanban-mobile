export interface Theme {
    textSizes: {
        heading: {
            xl: number
            l: number
            m: number
        }
    }
    text: {
        primary: string
        secondary: string
        error: string
        caption: string
        textFieldLabel: string
        textFieldPlaceholder: string
        light: string
    }

    background: {
        card: {
            primary: string
            secondary: string
        }
        checkbox: {
            default: string
            checked: string
            hover: string
        }
        select: {
            option: string
        }
        button: {
            primary: {
                default: string
                hover: string
            }
            secondary: {
                default: string
                hover: string
            }
            error: {
                default: string
                hover: string
            }
        }
        modal: {
            ovarlay: string
            dialog: string
        }
        paper: {
            primary: string
            secondary: string
        }
    }
}
