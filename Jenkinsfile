pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                step([$class: 'DockerComposeBuilder']) {
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}
