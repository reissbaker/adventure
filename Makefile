# Executables
# ------------------------------------------------------------------------------

node_modules/.bin/uglifyjs:
	npm install

node_modules/.bin/bower:
	npm install


# Files
# ------------------------------------------------------------------------------

build/js/adventure.js:
	mkdir -p build/js
	cat \
		app/js/index.js \
		> $@

build/js/adventure.min.js: build/js/adventure.js node_modules/.bin/uglifyjs
	./node_modules/.bin/uglifyjs \
		-m \
		-c warnings=false,unsafe=true \
		$< > $@

build/css/adventure.css:
	mkdir -p build/css
	cat \
		app/css/index.css \
		> $@


# Build Commands
# ------------------------------------------------------------------------------

.PHONY: clean
clean:
	rm -rf build
	mkdir build

.PHONY: build
build:  \
	build/js/adventure.js build/js/adventure.min.js \
	build/css/adventure.css

.PHONY: rebuild
rebuild: clean build
