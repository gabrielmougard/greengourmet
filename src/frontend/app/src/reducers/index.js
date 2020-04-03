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
        default:
            return state;
    }
};

export default reducer;