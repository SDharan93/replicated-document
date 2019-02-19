// Copied from: https://basarat.gitbooks.io/typescript/docs/testing/jest.html
module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "(/test/.*|(\\.|/)test)\\.ts$",
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
};
