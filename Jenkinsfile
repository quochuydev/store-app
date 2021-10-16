pipeline {
    agent any
    stages {
        stage('Tests') {
            steps {
//                 script {
//                    docker.image('node:10-stretch').inside { c ->
                        echo 'Building..'
                        sh 'npm install'
                        echo 'Testing..'
                        sh 'npm test'
//                         sh "docker logs ${c.id}"
//                    }
//                 }
            }
        }
        stage('Build and push docker image') {
            steps {
                script {
                    def dockerImage = docker.build("quochuydev/store-app:master")
                    docker.withRegistry('', 'dockerhub_id') {
                        dockerImage.push('master')
                    }
                }
            }
        }
        stage('Deploy to remote docker host') {
            environment {
                DOCKER_HOST_CREDENTIALS = credentials('store-app')
            }
            steps {
                script {
//                     sh 'docker login -u $DOCKER_HOST_CREDENTIALS_USR -p $DOCKER_HOST_CREDENTIALS_PSW 127.0.0.1:2375'
                    sh 'docker pull quochuydev/store-app:master'
                    sh 'docker stop store-app'
                    sh 'docker rm store-app'
                    sh 'docker rmi quochuydev/store-app:current'
                    sh 'docker tag quochuydev/store-app:master quochuydev/store-app:current'
                    sh 'docker run -d --name store-app -p 3000:3000 quochuydev/store-app:current'
                }
            }
        }
    }
}