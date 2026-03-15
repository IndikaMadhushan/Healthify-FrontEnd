pipeline {
    agent any

    stages {
        stage('Clean workspace') {
            steps {
                sh 'rm -rf Healthify-FrontEnd'
            }
        }

        stage('Clone code') {
            steps {
                sh 'git clone https://github.com/IndikaMadhushan/Healthify-FrontEnd.git'
            }
        }

        stage('Build Docker image') {
            steps {
                sh '''
                    cd Healthify-FrontEnd
                    docker build -t healthify-frontend:v1 .
                '''
            }
        }

        stage('Deploy container') {
            steps {
                sh '''
                    docker rm -f healthify-frontend-container || true
                    docker run -d -p 3000:3000 --name healthify-frontend-container healthify-frontend:v1
                '''
            }
        }
    }
}
