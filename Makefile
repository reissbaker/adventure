node_modules/.bin/uglifyjs:
	npm install

node_modules/.bin/bower:
	npm install

build/adventure.js:
	cat \
		lib/index.js \
		> $@

build/adventure.min.js: build/adventure.js node_modules/.bin/uglifyjs
	./node_modules/.bin/uglifyjs \
		-m \
		-c warnings=false,unsafe=true \
		$< > $@

build/adventure.min.js.gz: build/adventure.min.js
	gzip -c $< > $@

.PHONY: clean
clean:
	rm -rf build
	mkdir build

.PHONY: build
build: build/adventure.js build/adventure.min.js build/adventure.min.js.gz

.PHONY: rebuild
rebuild: clean build
