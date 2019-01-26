ALL_PROTOS := $(shell find ./protos -type f -name "*.proto")

PROTO_JS_BIN = ./bin

PROTO_JS_FLAGS = --js_out=import_style=commonjs,binary:

build: $(ALL_PROTOS)
	mkdir -p $(PROTO_JS_BIN) && protoc $(PROTO_JS_FLAGS)$(PROTO_JS_BIN) $(ALL_PROTOS)

clean:
	rm -rf $(PROTO_JS_BIN)

.PHONY: build
.PHONY: clean
