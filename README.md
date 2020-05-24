# GreenGourmet repository
The official greengourmet.fr project repository.
![](src/frontend/app/src/assets/fullLogoTransparent.png)

## API documentation :
List the API endpoints below with the associated http verb, request body content (JSON format), response body content (JSON format).

### **frontend** (http://localhost:3000)

Description:

* React/Redux/Saga frontend container of the platform.

### **ggauthserver** (http://localhost:8080 or http://authservicedev:8080 inside docker network)

Description:

* Authentication server with support for OAuth2 protocol (only with Google provider for now but the architecture is scalable for other providers). Support for basic Login/signup with authentication token.

Endpoints :

*  **/oauth2/authorize/google?redirect_uri=<REDIRECT_URI>** : used for google OAuth2 authentication.
* **/auth/login** : local login system
* **/auth/signup** : local signup system
* **/user/me** : get basic user information once logged in
* **/auth/checkpincode** : if the account hasn't been unlocked, process the pincode for unlocking. 
    * param = {"pincode" : PINCODE, "email": EMAIL}
* **/auth/newpincode** : if the user decide to generate a new pincode.
    * param = {"email": EMAIL}

### **ggscanner** (http://localhost:8081 or http://scannerservicedev:8081 inside docker network)

Description:

* Scanner server makes possible to get all useful information on a product according to its barcode.

Endpoint :

* **/scanner** : get product informations
    * Input param = {"userId" : USERID, "barcode": BARCODE}
    * Output param = {"status":STATUS,"item":{"barcode": BARCODE,"name": PRODUCT_NAME,"brand": BRAND,"quantity": [QUANTITY_FLOAT_THEN_UNITE],"manufacturingCountry": MANUFACTURINGCOUNTRY,"ingredients": "DESCRIPTION_OF_INGREDIENTS","allergens":[LIST_OF_ALLERGENS], "traceAllergens":[LIST_OF_TRACEALLERGENS],"additifs":[LIST_ADDITIFS], "nutritionalMark":"URL_TO_PICTURE_OF_NUTRITIONALMARK","kj":ENERGY_FOR_100g}}

### **ggarticleserver** (http://localhost:8082 or http://articleservicedev:8082 inside docker network)

* GET **/article/user/{userId}** : return the array of article possessed by the userId
* DELETE **/article/delete/{articleId}** : delete an article identified by articleId
* PUT **/article/update/{articleId}** : update an article 
    * params : the modified article
* POST **/article** : create a list of articles
    * params : the array of new articles (without redisUUID and articleId ; those are generated in the back) exemple : `{ "articles" : [
	{ 
		"userId" : 1, 
		"name" : "jus d'orange Paquito", 
		"ingredients" : "jus d'orange", 
		"quantity" : 2.0, 
		"quantityUnit" : "litres", 
		"expiringDate" : "27/05/2020", 
		"barcode" : "75728658585"
		
	},
	{ 
		"userId" : 1, 
		"name" : "jus d'orange Paquito", 
		"ingredients" : "jus d'orange", 
		"quantity" : 3.0, 
		"quantityUnit" : "grammes", 
		"expiringDate" : "27/05/2020", 
		"barcode" : "757999958585"
		
	},
	{ 
		"userId" : 1, 
		"name" : "jus d'orange Paquito", 
		"ingredients" : "jus d'orange", 
		"quantity" : 2.0, 
		"quantityUnit" : "litres", 
		"expiringDate" : "27/05/2020", 
		"barcode" : "75728658585"
		
	}
	]
}`




### **ggmailserver** (http://localhost:8083 or http://mailserverdev:8083 inside docker network)

Description : 

* Send email to users to different purposes

Endpoints :

* **/mail/sendconfirmation** : used for sending confirmation pincode.
    * input param = {to: STRING, pincode: INT, subject: STRING}
* [TODO] **mail/sendperemptionalert** : used for sending peremption alert to a user.
    * input param = {to: STRING, articles: [{ARTICLE_OBJECT#0}, ..., {ARTICLE_OBJECT#N}]}

### **ggrecipesserver** (http://localhost:8084 or http://mailserverdev:8084 inside docker network)

Description : 

* Recipes server makes possible to get all recipes related to several ingredients.

Endpoints :

* **/getListRecipes** : get a list of recipes and a small descirption of them.
    * input param = {"ingredients": [{"ingredients_1", ..., "ingredients_N"}]}
    * Output param = {"status" : STATUS, "recettes" : [{RECIPES_OBJECT#0}, ..., {RECIPES_OBJECT#N}]}
* **/getRecipe** : get one recipe and all its related informations.
    * input param = {RECIPES_OBJECT#0}
    * input param = {"MarmittonURL" : "MARMITTONURL"}
    * Output param = {"STATUS" : STATUS, "recettes" : [{RECIPES_OBJECT#0}}
    * {RECIPES_OBJECT#0} = {"name" : "NAME", "tags" : ["tags_1", ..., "tags_N"], "nb_comments" : ["comments_1", ..., "comments_N"] , "cook_time" : "COOK_TIME", "description" : "DESCRIPTION", "imageURL" : "IMAGEURL", "MarmittonURL" : "MARMITTONURL" , "steps" : ["Step_1", ..., "Steps_N"], "title" : "TITLE", "temps" : "TEMPS", to : FLOAT "personnes" : PERSONNES, "difficulte" : "DIFFICULTE", "count" : "COUNT", "ustensiles" : ["ustensile_1", ..., "ustensile_N"], "ingredients" : Map<String, Float>, "recettes" : Map<String,ArrayList<String>>}

### **mysql** (http://dbtest:3306 only available inside docker network)

Description :

* Only for user credentials related data.

### **mongocluster** (http://mongocluster:27017 only available inside docker network)

Description : 

* Used for storing user's articles and recipes.

### **rediscluster** (http://rediscluster:6379 only available inside docker network)

Description :

* It acts as a "cache server" for a faster retrieving (**x50 speed**) of mongoDB data like articles and eventually recipes. It implements a custom **LRU** policy.

## MongoDB collections documentation :

We have decided to store the articles and the recipes in mongoDB. Here is the description of the collections and the format of the object :

* `collections.Article`: we store the articles with the following format :

    * Article article = {
        articleId : **ObjectId**, 
        userId : **String**,
        name : **String**,
        quantity : **float**,
        quantityUnit : **String**,
        expiringDate : **String**,
        barcode : **String**,
        redisUUID : **String**
    }
    
    * `articleId` is the index of the object in mongo.
    *  `userId` is the id of the user who own the article.
    * `name` is the description of the article.
    * `quantity` is the amount (float) of the article.
    * `quantityUnit` is the unit of the amount (grams, liters, etc.)
    * `expiringDate` is the expiringDate of the article (format is `DD/MM/YYYY`)
    * `barcode` is the barcode of the article (usually, for food, its a sequence of 12 digits)
    * `redisUUID` is the unique identifier composed of hexedecimal characters of the article when stored in the cache (e.g : `fa0630ca-825e-4d54-91d7-4f43171f2cb5`)

* `collections.Item`: we store the products with the following format :

    * Item item = {
        barcode : **String**, 
        name : **String**,
        brand : **String**,
        quantity : **List<Object>**,
        manufacturingCountry : **String**,
        ingredients : **String**,
        allergens : **List<String>**,
        traceAllergens : **List<String>**,
        additifs : **List<String>**,
        nutritionalMark : **String**,
        kJ : **String**
    }
    
    * `barcode` is the barcode of the article (usually, for food, its a sequence of 12 digits).
    * `name` is the description of the article.
    * `brand` is the brand of the article.
    * `quantity` is the amount (float) of the article in first and then the unit.
    * `manufacturingCountry` this is where the product was built.
    * `ingredients` this is the description of the ingredients contained in the product.
    * `allergens` list of allergens contained in the products.
    * `traceAllergens` list of allergens contained in the products in low quantity.
    * `additifs` list of additifs contained in the products.
    * `nutritionalMark` is the nutritional quality of the product.
    * `kJ` is the energy supplied by the product in kJ per 100g.

## Next steps

* **Development** : We have numerous features to implement which are not in the MVP. Here is a non-exhaustive list of it :
    
    * Implement the **Leaderboard**
    * Implement the **statistics** 
    * Adapt MongoDB to support **ElasticSearch/Apache Solr** as a search engine for indexing recipes.
    * If recipe not present in in-house storage (mongoDB), then save it. The purpose is to have a growing recipe database and rely less and less on third-party APIs.

* **DevOps/Cloud related** : This platform is meant to be cloud native. We chose **GCP (Google Cloud Platform)** to host our platform leveraging the **GKE (Google Kubernetes Engine)** to orchestrate it. Thus we will need to create k8s manifests for our microservices (Spring boot and react) but also for our different persistence solutions (design MongoDB and Redis and YugabyteDB (for distributed SQL database) clusters)

    * push docker images on Docker Hub.
    * Optimize images build for production.
    * Define Kubernetes Secrets Resources for storing all our credentials and adapt k8s pods to get the credentials via environment variables.
    * Deploy Jaeger/Zipkin solution for distributed tracing and Prometheus + Grafana for visualizing distributed metrics.

## Kubernetes resources

* https://www.callicoder.com/deploy-spring-mysql-react-nginx-kubernetes-persistent-volume-secret/
* https://github.com/callicoder/spring-security-react-ant-design-polls-app
