#!/bin/bash

# Remove any chrome-extension directory
rm -rf chrome-extension

# Remove any webtime.zip files
rm webtime.zip

# Create a new chrome-extension directory
mkdir chrome-extension

# Copy the dist folder into the chrome-extension directory
cp -r webtime-dist/* chrome-extension

# Remove all sourcemap files from the chrome-extension directory
find chrome-extension/dist -name '*.map' -type f -delete

# Remove all .DS_Store files from the chrome-extension directory
find chrome-extension -name '.DS_Store' -type f -delete

# Compress the chrome-extension directory into a zip file
zip -r webtime.zip chrome-extension
