#!/bin/sh

npm version patch
git push origin master --tags
npm run build
npm publish --access public
