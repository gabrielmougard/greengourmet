#!/bin/bash
if [ -z "$1" ]
then
test="curl -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"userId\":100, \"barcode\":3560070614172}' http://localhost:8084/scanner"
else
test="curl -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"userId\":100, \"barcode\":$1}' http://localhost:8084/scanner"
fi
bash -c "$test"
