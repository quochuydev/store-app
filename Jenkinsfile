pipeline {
    environment { 
        registry = "quochuydev/store-app" 
        registryCredential = 'dockerhub_id' 
    }
    agent any
    tools { dockerTool  "docker" } 
    stages {
        stage('Cloning our Git') { 
            steps { 
                sh "echo $PATH"
                git 'https://github.com/quochuydev/store-app.git' 
            }
        }
        stage('Build and Push image') {
            steps {
                script { 
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                    sh "docker rmi $registry:$BUILD_NUMBER"
                }
            }
        }
    }
}