# GreenGourmet repository
The official greengourmet.fr project repository.

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
    * param = {"userId" : USERID, "barcode": BARCODE}

### **ggarticleserver** (http://localhost:8082 or http://articleservicedev:8082 inside docker network)

### **ggmailserver** (http://localhost:8083 or http://mailserverdev:8083 inside docker network)

Description : 

* Send email to users to different purposes

Endpoints :

* **/mail/sendconfirmation** : used for sending confirmation pincode.
    * input param = {to: STRING, pincode: INT, subject: STRING}
* [TODO] **mail/sendperemptionalert** : used for sending peremption alert to a user.
    * input param = {to: STRING, articles: [{ARTICLE_OBJECT#0}, ..., {ARTICLE_OBJECT#N}]}

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