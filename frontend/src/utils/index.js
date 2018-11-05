export const FormatDate= (oldDate) => {
    let newDate = new Date(oldDate)
    return newDate.toLocaleDateString()
}


