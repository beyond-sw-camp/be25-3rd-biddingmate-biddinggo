pipeline {
  agent any

  options {
    disableConcurrentBuilds()
  }

  environment {
    GHCR_REGISTRY = 'ghcr.io'
    GHCR_OWNER = 'beyond-sw-camp'
    IMAGE_NAME = 'be25-3rd-biddingmate-biddinggo'
    GHCR_IMAGE_NAME = "${GHCR_REGISTRY}/${GHCR_OWNER}/${IMAGE_NAME}"

    CICD_REPO_URL = 'github.com/beyond-sw-camp/be25-4th-biddingmate-biddinggo.git'
    FRONTEND_DEPLOYMENT_MANIFEST = 'infra/k8s/frontend/deployment.yaml'

    VITE_API_BASE_URL = 'https://api.bidding-go.shop'
    VITE_TOSS_CLIENT_KEY = 'test_ck_4yKeq5bgrpPoPA0lxOkXrGX0lzW6'
  }

  stages {
    stage('Docker Build') {
      steps {
        script {
          env.IMAGE_TAG = "${env.BUILD_NUMBER}"
        }

        sh '''
          docker build --no-cache \
            --build-arg VITE_API_BASE_URL=$VITE_API_BASE_URL \
            --build-arg VITE_TOSS_CLIENT_KEY=$VITE_TOSS_CLIENT_KEY \
            -t $GHCR_IMAGE_NAME:$IMAGE_TAG \
            -t $GHCR_IMAGE_NAME:latest \
            .
        '''

        sh 'docker image inspect $GHCR_IMAGE_NAME:$IMAGE_TAG'
      }
    }

    stage('Push to GHCR') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
          sh '''
            echo "$GITHUB_TOKEN" | docker login $GHCR_REGISTRY -u "$GITHUB_USER" --password-stdin
            docker push $GHCR_IMAGE_NAME:$IMAGE_TAG
            docker push $GHCR_IMAGE_NAME:latest
            docker logout $GHCR_REGISTRY
          '''
        }
      }
    }

    stage('Update Frontend Deployment') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
          sh '''
            rm -rf cicd-repo
            git clone https://$GITHUB_USER:$GITHUB_TOKEN@$CICD_REPO_URL cicd-repo

            cd cicd-repo

            git config user.name "jenkins-bot"
            git config user.email "jenkins-bot@users.noreply.github.com"

            sed -i "s|image: .*|image: $GHCR_IMAGE_NAME:$IMAGE_TAG|" $FRONTEND_DEPLOYMENT_MANIFEST

            grep "image: $GHCR_IMAGE_NAME:$IMAGE_TAG" $FRONTEND_DEPLOYMENT_MANIFEST

            git diff -- $FRONTEND_DEPLOYMENT_MANIFEST
            git add $FRONTEND_DEPLOYMENT_MANIFEST
            git diff --cached --quiet && echo "No frontend image change." || git commit -m "ci: update frontend image to $IMAGE_TAG [skip ci]"
            git pull --rebase origin main
            git push origin main
          '''
        }
      }
    }
  }

  post {
    success {
      echo """
============================================================
  ✅ BiddingGo frontend pipeline succeeded
============================================================

  🧭 Build
    Job        : ${env.JOB_NAME} #${env.BUILD_NUMBER}
    Duration   : ${currentBuild.durationString.replace(' and counting', '')}

  🐳 Image
    Version    : ${env.GHCR_IMAGE_NAME}:${env.IMAGE_TAG}

============================================================
"""
    }

    failure {
      echo """
============================================================
  ❌ BiddingGo frontend pipeline failed
============================================================

  🧭 Build
    Job        : ${env.JOB_NAME} #${env.BUILD_NUMBER}
    Duration   : ${currentBuild.durationString.replace(' and counting', '')}

  🔎 Debug
    Console    : ${env.BUILD_URL}console

============================================================
"""
    }
  }
}