//ONLY for test
/*
let testInventory = [
    {
        articleId: "d0e49330-961e-4de1-9eb1-70e36da19d57", 
        barcode: "3250390503101", 
        expiringDate: "28/05/2020", 
        ingredients: "mouchoirs blancs 3 épaisseurs", 
        name: "mouchoirs blancs 3 épaisseurs", 
        quantity: 119, 
        quantityUnit: "csoupe", 
        redisUUID: "d0e49330-961e-4de1-9eb1-70e36da19d57", 
        userId: "1"
    },
    {
        articleId: "517f0836-1111-4042-8044-61bb2c9347a7",
        barcode: "75728658585",
        expiringDate: "27/05/2020",
        ingredients: "jus d'orange",
        name: "jus d'orange Paquito",
        quantity: 2,
        quantityUnit: "l",
        redisUUID: "517f0836-1111-4042-8044-61bb2c9347a7",
        userId: "1",
    },
    {
        articleId: "24a8cbfa-d8cc-4388-9280-991bd2beb080",
        barcode: "3250390769811",
        expiringDate: "26/05/2020",
        ingredients: "jus d'orange",
        name: "100% Pur Jus Orange sans pulpe",
        quantity: 2,
        quantityUnit: "l",
        redisUUID: "24a8cbfa-d8cc-4388-9280-991bd2beb080",
        userId: "1",
    }
]
let testRecipesIngredients = {
    "cl de jus d'orange": 50,
    "g de Fleur de Maïs Maïzéna®": 20,
    "g de sucre": 50,
    "oeufs": 5,
    "zeste d'orange": null
}

let testNewInventory = {
    toUpdate : {0:
        [
            {
                articleId: "517f0836-1111-4042-8044-61bb2c9347a7",
                barcode: "75728658585",
                expiringDate: "27/05/2020",
                ingredients: "jus d'orange",
                name: "jus d'orange Paquito",
                quantity: 1.3,
                quantityUnit: "l",
                redisUUID: "517f0836-1111-4042-8044-61bb2c9347a7",
                userId: "1",
            },
            {
                articleId: "d0e49330-961e-4de1-9eb1-70e36da19d57", 
                barcode: "3250390503101", 
                expiringDate: "28/05/2020", 
                ingredients: "mouchoirs blancs 3 épaisseurs", 
                name: "mouchoirs blancs 3 épaisseurs", 
                quantity: 13, 
                quantityUnit: "csoupe", 
                redisUUID: "d0e49330-961e-4de1-9eb1-70e36da19d57", 
                userId: "1"
            }
        ]
    },
    toDelete : {0:
        [
            {
                articleId: "24a8cbfa-d8cc-4388-9280-991bd2beb080",
                barcode: "3250390769811",
                expiringDate: "26/05/2020",
                ingredients: "jus d'orange",
                name: "100% Pur Jus Orange sans pulpe",
                quantity: 2,
                quantityUnit: "l",
                redisUUID: "24a8cbfa-d8cc-4388-9280-991bd2beb080",
                userId: "1",
            }
        ]
    }
}
//
const res = updateLocalInventory(testInventory, testRecipesIngredients)
res.toDelete.push({
    articleId: '24a8cbfa-d8cc-4388-9280-991bd2beb080',
    barcode: '3250390769811',
    expiringDate: '26/05/2020',
    ingredients: "jus d'orange",
    name: '100% Pur Jus Orange sans pulpe',
    quantity: 2,
    quantityUnit: 'l',
    redisUUID: '24a8cbfa-d8cc-4388-9280-991bd2beb080',
    userId: '1'
  }) //just for the test
console.log(res)
*/
//test intersection

//intersection(testInventory, res)
//console.log(res)
//

export function updateLocalInventory(inventory, recipesIngredients) {

    const QUANTITY_MULTIPLE = {g: 1, kg: 1000, ml: 1, cl: 10, dl: 100, l: 1000, tasse: 236, csoupe: 15, ccafe: 5}

    let res = []
    let toDelete = []
    let levThreshold = 0

    for (let [keyI, valueI] of Object.entries(recipesIngredients)) {
        for (const idx in inventory) {
            let article = inventory[idx]
            const quantityUnit = keyI.split(" ")[0]
            const ingredient = keyI.split(" ").slice(1, keyI.split(" ").length).join(" ")
            // set the levenshtein detection threshold for this couple of string
            levThreshold = maxStringLength(ingredient, article.name) / 1.5
            if (levenshteinDistance(ingredient.toLowerCase(), article.name.toLowerCase()) <= levThreshold) {
                console.log("likelihood detected for : "+ingredient+" and "+article.name)
                
                //likelihood detected
                //check the quantity unit of the article and 'quantityUnit'
                console.log("quantityUnit : "+quantityUnit)
                console.log("article.quantityUnit : "+article.quantityUnit)
                console.log("")
                if (Object(QUANTITY_MULTIPLE).hasOwnProperty(quantityUnit) && Object(QUANTITY_MULTIPLE).hasOwnProperty(article.quantityUnit)) {
                    console.log("units are correct")
                    //if they are in the keys of QUANTITY_MULTIPLE, then continue, else go to next article
                    let qIngredient = valueI*QUANTITY_MULTIPLE[quantityUnit]
                    let qArticle = article.quantity*QUANTITY_MULTIPLE[article.quantityUnit]
                    //unit conversion and substract. If negative, add the article in 'toDelete'
                    const delta = (qArticle - qIngredient) / QUANTITY_MULTIPLE[article.quantityUnit]
                    if (delta <= 0) {
                        //not enough quantity, mark the article as to be deleted
                        toDelete.push(article)
                    } else {
                        //update quantity
                        article.quantity = delta
                        res.push(article)
                    }
                }
            } 
            /*
            else {
                console.log("levenshtein distance is too big between : "+ingredient+" and "+article.name+" ( dist : "+levenshteinDistance(ingredient, article.name)+", thres : "+levThreshold)
                console.log("")
            } 
            */
        }
    }
    return {toUpdate: res, toDelete: toDelete}
}

function levenshteinDistance(a, b) {
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = 
                    Math.min(matrix[i-1][j-1] + 1, // substitution
                        Math.min(matrix[i][j-1] + 1, // insertion
                            matrix[i-1][j] + 1
                        )
                    ); // deletion
            }
        }
    }
  
    return matrix[b.length][a.length];
}

function maxStringLength(a, b) {
    const s1 = a.length
    const s2 = b.length

    if (s1 < s2) {
        return s2
    } else {
        return s1
    }   
}

export function intersectionInventory(currentInventory, newInventory) {
    let toUpdate = newInventory.toUpdate
    let toDelete = newInventory.toDelete
    let alreadyAdded = []
    let cpy = []
    
    //update
    toUpdate.forEach(articleToUpdate => {
        currentInventory.forEach(article => {
            if (articleToUpdate.articleId == article.articleId) {
                cpy.push(articleToUpdate)
                alreadyAdded.push(articleToUpdate.articleId)
            } else {
                if (!alreadyAdded.includes(article.articleId)) {
                    cpy.push(article)
                }
            }
        })
    })

    //delete
    let res = cpy
    toDelete.forEach(articleToDelete => {
        for (let idx in cpy) {
            if (articleToDelete.articleId == cpy[idx].articleId) {
                res.splice(idx, idx+1)
            }
        }
    })
    
    return res

}