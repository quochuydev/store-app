pipeline {
    agent any
    stages {
        stage('build') {
            step([$class: 'DockerComposeBuilder']) {
                sh 'docker-compose up -d --build'
            }
        }
    }
}
