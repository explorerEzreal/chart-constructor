pipeline {
  agent any

  parameters {
    string(
      name: 'TARGET_SHA',
      defaultValue: '',
      description: '指定要发布的完整 40 位提交 SHA；留空时发布当前 master HEAD'
    )
  }

  triggers {
    githubPush()
  }

  options {
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
    timeout(time: 30, unit: 'MINUTES')
    timestamps()
  }

  environment {
    DEPLOY_HOST = '106.55.36.91'
    SITE_URL = 'https://chart.supershiba.cn'
    DEPLOY_CREDENTIAL_ID = 'chart-constructor-server-deploy'
  }

  stages {
    stage('检出发布提交') {
      steps {
        checkout scm
        script {
          def targetSha = params.TARGET_SHA?.trim()
          env.RELEASE_SHA = targetSha ?: sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
          if (!(env.RELEASE_SHA ==~ /^[0-9a-f]{40}$/)) {
            error('发布 SHA 格式不正确')
          }
        }
      }
    }

    stage('触发服务器发布') {
      steps {
        withCredentials([
          sshUserPrivateKey(
            credentialsId: env.DEPLOY_CREDENTIAL_ID,
            keyFileVariable: 'DEPLOY_KEY',
            usernameVariable: 'DEPLOY_USERNAME'
          )
        ]) {
          sh '''
            set -euo pipefail
            KNOWN_HOSTS="$(mktemp)"
            trap 'rm -f "$KNOWN_HOSTS"' EXIT
            ssh-keyscan -H "$DEPLOY_HOST" > "$KNOWN_HOSTS" 2>/dev/null
            ssh \
              -i "$DEPLOY_KEY" \
              -o BatchMode=yes \
              -o IdentitiesOnly=yes \
              -o StrictHostKeyChecking=yes \
              -o UserKnownHostsFile="$KNOWN_HOSTS" \
              "${DEPLOY_USERNAME}@${DEPLOY_HOST}" \
              "deploy ${RELEASE_SHA}"
          '''
        }
      }
    }

    stage('线上验收') {
      steps {
        sh '''
          set -euo pipefail
          for path in / /demo /guide; do
            status="$(curl -sS -o /dev/null -w '%{http_code}' -m 20 "${SITE_URL}${path}")"
            echo "${path} -> ${status}"
            if [ "$status" != "200" ]; then
              echo "健康检查失败：${SITE_URL}${path} 返回 ${status}"
              exit 1
            fi
          done
        '''
      }
    }
  }

  post {
    success {
      echo "发布成功：${SITE_URL}，版本：${env.RELEASE_SHA}"
    }
    failure {
      echo '发布失败，线上版本未切换，请查看构建日志和服务器发布日志'
    }
  }
}
