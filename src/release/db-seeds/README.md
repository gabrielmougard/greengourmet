# What are the database seeds ?

In order to run tests, we will launch a MySQL container populated with some test data :

* some tables (`users` for example)
* maybe some default data for tests purpose.

## Format of the seeds ?

A "seed" can be either a `.sql` or a `.sh` file. The instructions inside will be executed at launch time of the container. The name of the seed files matters ! Indeed, the files are executed in **lexicographical** order. `abc.sql` will be executed before `ccc.sql` for example. So think about it if you don't want to try to access to some data before it's not even created... 