import { sayHello } from "./greet";
const protos = require("../lib-protos/document_data");

console.log(sayHello("TypeScript"));

const char = protos.document.data.PositionIdentifier.create();
char.siteId = "shane e ee";
const err = protos.document.data.PositionIdentifier.verify(char);
console.log(sayHello(err));
