export const getPaddingByCss = (style: string) => {
    const splitedPadding = style.split(' ')
    if (splitedPadding.length === 2) {
        return {
            paddingTop: Number(splitedPadding[0]),
            paddingRight: Number(splitedPadding[1]),
            paddingBottom: Number(splitedPadding[0]),
            paddingLeft: Number(splitedPadding[1]),
        }
    }

    if (splitedPadding.length === 4) {
        return {
            paddingTop: Number(splitedPadding[0]),
            paddingRight: Number(splitedPadding[1]),
            paddingBottom: Number(splitedPadding[2]),
            paddingLeft: Number(splitedPadding[3]),
        }
    }

    if (splitedPadding.length === 1) {
        return {
            paddingTop: Number(splitedPadding[0]),
            paddingRight: Number(splitedPadding[0]),
            paddingBottom: Number(splitedPadding[0]),
            paddingLeft: Number(splitedPadding[0]),
        }
    }

    return { paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }
}
