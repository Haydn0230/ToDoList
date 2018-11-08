import _ from 'lodash'

export const FormatDate= (oldDate) => {
    let newDate = new Date(oldDate)
    return newDate.toLocaleDateString()
}

export const validation = (props) => {
    //set containers 
    let error = '';

    //loop through state to check all fields contain data
    const object = props

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (element === '' && key !== 'errorMessage') {
                if (error ==='' ){
                    error += _.startCase(key)
                } else {
                    error += ' and ' +_.startCase(key)
                }
            }
        }
    }
    return error
}


