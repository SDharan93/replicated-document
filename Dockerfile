# Start by building the typescript application, compiling protos and testing
FROM node:10-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# To keep our image as small as possible, we will copy ONLY the executables
FROM gcr.io/distroless/nodejs

WORKDIR /build
COPY --from=build /app .
