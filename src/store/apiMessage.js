/** 
 * @author  https://github.com/abderox
*/

import * as type from './actions';


 const setMessage = (message) => {
    return {
        type: type.SET_MESSAGE,
        message: message
    }
}

 const clearMessage = () => {
    return {
        type: type.CLEAR_MESSAGE
    }
}

export default {setMessage, clearMessage};