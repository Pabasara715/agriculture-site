pipeline {
    agent any
    
 
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Run Docker Compose') {
            steps {
                bat 'docker-compose build'
                bat 'docker-compose up -d'
            }
        }
        
        stage('Run Tests') {
            steps {
               
                bat 'docker-compose exec app pytest'
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
