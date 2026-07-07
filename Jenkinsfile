def BITBUCKET_REPO_NAME           = 'custom_module-city'
def BITBUCKET_REPO_CREDENTIALS_ID = 'BitBucketCredentials'
def BITBUCKET_TEAM = 'cajedu'

def PUSH_OVER_USER = 'uw18yyyqgiv6noqmcbhhf1evvwn519'
def PUSH_OVER_TOKEN = 'amm8qn4ozsxmtdnrqs61etod8ri1d6'
def FURY_USER  = 'cajedu'
def FURY_EMAIL = 'f1@cajedu.com'
def FURY_PASS  = 'AUanZTYyjJSs1oMiJfjV'

node('master') {
    properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '2')), gitLabConnection(''), [$class: 'RebuildSettings', autoRebuild: false, rebuildDisabled: false], [$class: 'ThrottleJobProperty', categories: [], limitOneJobWithMatchingParams: false, maxConcurrentPerNode: 0, maxConcurrentTotal: 0, paramsToUseForLimit: '', throttleEnabled: false, throttleOption: 'project'], pipelineTriggers([])])

    stage('Install gemfury') {
        sh """#!/usr/bin/env bash
        sudo gem install gemfury
        sudo apt-get install jq -y"""
    }

    stage('Starting composer build') {
        git credentialsId: "${BITBUCKET_REPO_CREDENTIALS_ID}", url: "https://bitbucket.org/${BITBUCKET_TEAM}/${BITBUCKET_REPO_NAME}.git"
    }

    stage('Put credential') {
        sh """
        #!/usr/bin/env bash
        if [ ! -f ~/.netrc ]
        then
        > ~/.netrc
        fi

        if ! grep -q \"machine git.fury.io\" ~/.netrc; then
            echo 'machine git.fury.io' >> ~/.netrc
            echo '  login     ${FURY_EMAIL}' >> ~/.netrc
            echo '  password  ${FURY_PASS}' >> ~/.netrc
        fi
        """
    }

    stage('Push to gemfury') {
        sh """
        #!/usr/bin/env bash
        if git config remote.faraway.url > /dev/null; then
            git remote add fury https://git.fury.io/${FURY_USER}/${BITBUCKET_REPO_NAME}.git
        else
            git remote rm fury || true
            git remote add fury https://git.fury.io/${FURY_USER}/${BITBUCKET_REPO_NAME}.git
        fi
        git push fury master
        """
    }

    stage('Send Notification To Developers') {
        sh """
        #!/usr/bin/env bash
        GIT_COMMITTER_NAME=\$(git log -1 --pretty=format:'%an')
        GIT_BRANCH=\$(git branch)
        GIT_COMMIT_MESSAGE=\$(git log -1 --pretty=%B)

        PACKAGE_NAME=\$(jq -r '.name' composer.json)
        PACKAGE_VERSION=\$(jq -r '.version' composer.json)


        NOTE_MESSAGE="Please update composer, new commit at [\$PACKAGE_NAME@\$PACKAGE_VERSION] with message: \$GIT_COMMIT_MESSAGE on (\${GIT_BRANCH}) by: (\$GIT_COMMITTER_NAME)"

        curl -s  --form-string \"token=${PUSH_OVER_TOKEN}\" --form-string \"user=${PUSH_OVER_USER}\" --form-string \"message=\${NOTE_MESSAGE}\" https://api.pushover.net/1/messages.json"""
    }
}