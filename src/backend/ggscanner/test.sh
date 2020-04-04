#!/bin/bash
echo $(curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"userId":100, "barcode":3560070614172}' http://localhost:8081/scanner)