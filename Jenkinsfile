pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Clean Reports') {
            steps {
                bat 'if exist allure-report rmdir /s /q allure-report'
                bat 'if exist allure-results rmdir /s /q allure-results'
            }
        }

        stage('Run Sanity Tests') {
            steps {
                bat 'npm run test:sanity'
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            allure([
                includeProperties: false,
                results: [[path: 'allure-results']]
            ])
        }
    }
}