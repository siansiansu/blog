.PHONY: install start build serve clean deploy clear

install:
	npm install

start:
	npm start

build:
	npm run build

serve:
	npm run serve

clean:
	rm -rf build

deploy:
	npm run deploy

clear:
	rm -rf build .docusaurus node_modules
