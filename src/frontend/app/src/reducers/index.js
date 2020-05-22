//here we define our reducer(s)
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'TAB_POSITION_ENDED':
            if (action.payload.position) {
                return { ...state, tabPosition: action.payload.position}
            } else {
                return state;
            }
        case 'SEND_BARCODE_ENDED_SUCCESS':
            if (action.payload.item) {
                return { ...state, barcodeResult: action.payload.item}
            } else {
                return state;
            }
        case 'SEND_BARCODE_ENDED_FAILURE':
            return { ...state, unknownBarcode: action.payload}
            
        case 'SEND_ARTICLE_TO_CART':
            if (action.payload.name) {
                return { ...state, articleToCart: action.payload}
            }
        case 'VALIDATE_CART_ENDED':
            if (action.payload) {
                return { ...state, cartValidated: action.payload}
            }
        case 'CANCEL_ARTICLE_TO_CART':
            console.log("cancel cart !!!")
            return { ...state, cancelArticleToCart: action.payload}
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
        case 'GET_INVENTORY_ENDED':
            if (action.success) {
                return {...state, inventory: action.data}
            } else {
                return state
            }
        case 'GET_RECIPES_ENDED':
            if (action.success) {
                return {...state, recipes: action.recipes}
            } else {
                return {...state, recipes: ["recipes not found"]}
            }
        case 'GET_RECIPE_DETAILS_ENDED_SUCCESS':
            if (state.recipesDetails) {
                const newRecipeDetails = {
                    link: action.details.link,
                    recipe: action.details.response.recettes[0]
                }

                return {...state, recipesDetails: [...state.recipesDetails, newRecipeDetails]}
            } else {
                const newRecipeDetails = {
                    link: action.details.link,
                    recipe: action.details.response.recettes[0]
                }
                return {...state, recipesDetails: [newRecipeDetails]}
            }
        case 'GET_RECIPE_DETAILS_ENDED_FAILURE':
            return {...state, recipesDetails: ["recipe detail not found"]}
            
        default:
            return state;
    }
};

export default reducer;