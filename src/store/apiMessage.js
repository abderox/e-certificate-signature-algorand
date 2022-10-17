/** 
 * @author  https://github.com/abderox
*/

import * as type from './actions';


 const setMessage = (payload) => {
    return {
        type: type.SET_MESSAGE,
        payload: {
            message: payload.message,
            type: payload.type
        }
    }
}

 const clearMessage = () => {
    return {
        type: type.CLEAR_MESSAGE
    }
}

export  {setMessage, clearMessage};