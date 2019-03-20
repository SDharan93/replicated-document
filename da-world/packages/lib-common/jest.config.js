// Copied from: https://basarat.gitbooks.io/typescript/docs/testing/jest.html
module.exports = {
    projects: [
        '<rootDir>'
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
