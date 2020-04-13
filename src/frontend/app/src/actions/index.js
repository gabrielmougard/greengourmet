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

export const sendBarcodeContent = (userId, barcode) => ({
    type : 'SEND_BARCODE',
    payload: {
        userId: userId,
        barcode: barcode,
    }
})

export const fetchBarcodeContentEnded = (status, barcodeContent=null) => ({
    type: 'SEND_BARCODE_ENDED',
    payload: {
        status: status,
        barcodeContent: barcodeContent,
    }
})

export const addBarcodeContent = (userId, barcodeContent, quantity, expirationDate) => ({
    type: 'ADD_BARCODE',
    payload: {
        userId: userId,
        barcodeContent: barcodeContent,
        quantity: quantity,
        expirationDate: expirationDate,
    }
})

export const addBarcodeContentEnded = (status) => ({
    type: 'ADD_BARCODE_ENDED',
    payload: {
        barcodeAdded: status,
    }
})

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