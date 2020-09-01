#!/bin/bash

npm pack ./
rm -Rf ./test/package
tar -xzf azaraliyev-vmf*.tgz -C ./test
rm -f azaraliyev-azaraliyev-vmf-*.tgz
# Rename the fake published package to prevent Jest from
# complaining about two packages having the same name.
sed -i -e 's/azaraliyev-vmf/fake-azaraliyev-vmf/g' ./test/package/package.json
