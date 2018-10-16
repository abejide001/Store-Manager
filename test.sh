#!/usr/bin/env bash
npm install
./node_modules/.bin/babel --ignore node_modules . --out-dir _build
cp -R node_modules _build
cp package* _build
cd _build
npm test