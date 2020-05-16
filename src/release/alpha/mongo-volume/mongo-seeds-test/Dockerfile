FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongocluster-article --db admin --username root --password iuzkghkuzegdo --collection Article --type json --file /init.json --jsonArray