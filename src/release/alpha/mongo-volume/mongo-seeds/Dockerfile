FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongocluster --db admin --collection TestArticle --type json --file /init.json --jsonArray