FROM openjdk:17-alpine

RUN apk add --no-cache maven

WORKDIR /springboot_app

COPY src ./src
COPY pom.xml ./pom.xml
COPY entrypoint.sh .


