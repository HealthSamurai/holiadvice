#!/bin/bash
`npm bin`/grunt build
git checkout gh-pages
cp -r build/* .
git add .
git commit -m "Deploy"
git push
git checkout master
