pipeline {
    agent any
    
    environment {
        DOCKER_HOST = 'tcp://localhost:2375' // Docker host address
    }
    
    stages {
        stage('Checkout') {
            steps {
                bat 'git clone https://github.com/Pabasara715/agriculture-site.git'
            }
        }
        
        stage('Build and Run Docker Compose') {
            steps {
                bat 'docker-compose build'
                bat 'docker-compose up -d'
            }
        }
        
      
        
       
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed :('
        }
    }
}
