FROM openjdk:13 AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew.sh $APP_HOME
COPY gradle $APP_HOME/gradle
RUN ./gradlew.sh build || return 0 
COPY . .
RUN ./gradlew.sh build

FROM openjdk:13
ENV ARTIFACT_NAME=greengourmet-recipes-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 8084
ENV EXEC_PATH /usr/app/$ARTIFACT_NAME
CMD ["java","-jar","greengourmet-recipes-0.0.1-SNAPSHOT.jar"]