export const loadUser = (payload) => ({
    type: 'LOAD_USER',
})

export const goToDashboard = () => ({
    type: 'GOTO_DASHBOARD',
})

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

export const validateCartEndedSuccess = (payload) => ({
    type: 'VALIDATE_CART_ENDED_SUCCESS',
    payload,
})

export const validateCartEndedFailure = () => ({
    type: 'VALIDATE_CART_ENDED_FAILURE',
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

// get inventory
export const getInventory = (payload) => ({
    type: 'GET_INVENTORY',
    payload,
})

export const getInventoryEnded = (success, data=null) => ({
    type: 'GET_INVENTORY_ENDED',
    success: success,
    data: data,
})

export const updateInventory = (payload) => ({
    type: 'UPDATE_INVENTORY',
    payload,
})

export const updateInventorySuccess = (payload) => ({
    type: 'UPDATE_INVENTORY_SUCCESS',
    payload
})

export const updateInventoryFailure = () => ({
    type: 'UPDATE_INVENTORY_FAILURE',
})

// get recipes
export const getRecipes = (payload) => ({
    type: 'GET_RECIPES',
    payload
})

export const getRecipesEnded = (success, recipes=null) => ({
    type: 'GET_RECIPES_ENDED',
    success: success,
    recipes: recipes,
})

// get recipe details
export const fetchRecipeDetails = (payload) => ({
    type: 'GET_RECIPE_DETAILS',
    payload: payload
})

export const getRecipeDetailsEndedSuccess = (payload) => ({
    type: 'GET_RECIPE_DETAILS_ENDED_SUCCESS',
    details: payload,
})

export const getRecipeDetailsEndedFailure = () => ({
    type: 'GET_RECIPE_DETAILS_ENDED_FAILURE',
})