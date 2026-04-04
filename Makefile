.PHONY: install start build preview clean clear

install:
	npm install

start:
	npm start

build:
	npm run build

preview:
	npm run preview

clean:
	rm -rf dist

clear:
	rm -rf dist .astro node_modules
