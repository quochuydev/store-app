pipeline {
    environment { 
        registry = "quochuydev/store-app" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
        dockerHome = tool 'docker'
        PATH = "${dockerHome}/bin:${env.PATH}"
    }
    agent any
    stages {
        stage('Cloning our Git') { 
            steps { 
                git 'https://github.com/quochuydev/store-app.git' 
            }
        }
        stage('Building our image') { 
            steps { 
                script { 
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
                }
            } 
        }
        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push()
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry:$BUILD_NUMBER" 
            }
        } 
    }
}

pipeline {
    environment { 
        registry = "quochuydev/store-app" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
        dockerHome = tool 'docker'
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
                }
            }
        }
    }
}