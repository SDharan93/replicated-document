PATH := node_modules/.bin:$(PATH)

source_files := $(shell find ./protos -type f -name "*.proto")
build_files := $(source_files:./protos/%.proto=src/lib-proto/%.js)

PROTO_JS_BIN = ./src/lib-proto

PROTO_JS_FLAGS = --js_out=import_style=commonjs,binary:

build: $(ALL_PROTOS)
	mkdir -p $(PROTO_JS_BIN) && protoc $(PROTO_JS_FLAGS)$(PROTO_JS_BIN) $(source_files) --proto_path ./protos
	echo $(source_files)
	echo $(build_files)

ts_build: $(ALL_PROTOS)
	./node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -o $(PROTO_JS_BIN) $(ALL_PROTOS) -p ./protos

clean:
	rm -rf $(PROTO_JS_BIN)

.PHONY: build
.PHONY: clean
