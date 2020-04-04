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

export const addBarcodeContentEnded = (status) => ({
    type: 'ADD_BARCODE_ENDED',
    payload: {
        barcodeAdded: status,
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