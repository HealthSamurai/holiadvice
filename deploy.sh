#!/bin/bash
`npm bin`/grunt build
git subtree push --prefix build origin gh-pages
