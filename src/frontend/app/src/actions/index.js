//here we export our actions
export const sendTabPosition = (position) => ({
    type: 'TAB_POSITION',
    payload: {
        position: position,
    }
})
export const fetchTabPositionEnded = (position) => ({
    type: 'TAB_POSITION_ENDED',
    payload: {
        position: position,
    }
})

// SCANNER //
export const sendBarcodeContent = (userId, barcode) => ({
    type : 'SEND_BARCODE',
    payload: {
        userId: userId,
        barcode: barcode,
    }
})

export const sendBarcodeContentEndedSuccess = (payload) => ({
    type: 'SEND_BARCODE_ENDED_SUCCESS',
    payload,
})

export const sendBarcodeContentEndedFailure = (payload) => ({
    type: 'SEND_BARCODE_ENDED_FAILURE',
    payload,
})

export const sendArticleToCart = (payload) => ({
    type: 'SEND_ARTICLE_TO_CART',
    payload,
})

export const cancelArticleToCart = (payload) => ({
    type: 'CANCEL_ARTICLE_TO_CART',
    payload,
})

export const validateCart = (payload) => ({
    type: 'VALIDATE_CART',
    payload,
})

export const validateCartEnded = (payload) => ({
    type: 'VALIDARE_CART_ENDED',
    payload,
})

////////////

export const sendPincode = (values, userEmail) => ({
    type: 'SEND_PINCODE',
    payload: {
        pincodeValue: values,
        userEmail: userEmail,
    }
})

export const fetchPincodeEnded = (success) => ({
    type: 'SEND_PINCODE_ENDED',
    payload: {
        success: success,
    }
})

export const regeneratePincode = (userEmail) => ({
    type: 'REGENERATE_PINCODE',
    payload: {
        userEmail: userEmail,
    }
})

export const regeneratePincodeEnded = (success) => ({
    type: 'REGENERATE_PINCODE_ENDED',
    payload: {
        success: success,
    }
})

export const unlockPincodeScreen = () => ({
    type: 'UNLOCK_PINCODE_SCREEN',
})
//recipes

export const sendRecipesContent = (name) => ({
    type: 'FIND_RECIPES_CONTENT',
    payload:{
        name: name,
    }
})
export const sendRecipesContentSucces = (payload) => ({
    type: 'FIND_RECIPES_CONTENT_SUCCES',
    payload,
})