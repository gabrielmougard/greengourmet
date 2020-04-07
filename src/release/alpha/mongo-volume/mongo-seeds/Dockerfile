FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongoserver --db greengourmet --collection Article --type json --file /init.json --jsonArray