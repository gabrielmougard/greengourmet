//here we define our reducer(s)
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'TAB_POSITION_ENDED':
            if (action.payload.position) {
                return { ...state, tabPosition: action.payload.position}
            } else {
                return state;
            }
        case 'SEND_BARCODE_ENDED':
            if (action.payload.status && action.payload.barcodeContent) {
                return { ...state, barcodeContent: action.payload.barcodeContent}
            } else {
                return state;
            }
        case 'ADD_BARCODE_ENDED':
            if (action.payload.status) {
                return { ...state, barcodeAdded: action.payload.barcodeAdded}
            } else {
                return state;
            }
        case 'SEND_PINCODE_ENDED':
            return { ...state, pincodeEnded: action.payload.success}
        case 'REGENERATE_PINCODE_ENDED':
            return { ...state,regeneratePincodeEnded: action.payload.success}
        case 'UNLOCK_PINCODE_SCREEN':
            return { ...state, pincodeUnlocked: true}
        default:
            return state;
    }
};

export default reducer;