pipeline {
    agent { docker { image 'node:12.22.1-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
