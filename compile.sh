grunt build
grunt cssmin
mv dist/styles/main.css dist/styles/main.d41d8cd9.css
mkdir -p dist/scripts/vendors
mkdir -p dist/bower_components/d3
mkdir -p dist/bower_components/Processing.js
cp bower_components/d3/d3.min.js dist/bower_components/d3/d3.min.js
cp bower_components/Processing.js/processing.min.js dist/bower_components/Processing.js/processing.min.js
cp app/scripts/vendors/CryptoMD5.js dist/scripts/vendors/CryptoMD5.js
