TESTS = test/node/*.js
#REPORTER = dot

REPORTER = spec
g = salita

build: components salita.js #test
	@component build --dev

components: component.json
	@component install --dev

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--slow 500 \
		--grep $(g) \
		--timeout 3000 \
		$(TESTS) \
		2> /dev/null

min: components salita.js #test
	@component build --use component-minify

clean:
	rm -fr build components # template.js

docs:
	marked Readme.md > Junk/Readme.html

.PHONY: test clean docs
