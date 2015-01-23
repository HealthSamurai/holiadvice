#!/bin/bash
`npm bin`/grunt build
git subtree push --prefix dist origin gh-pages
