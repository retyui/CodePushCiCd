#!/bin/bash

set -x # all executed commands are printed to the terminal
set -e # immediately exit if any command has a non-zero exit status

source "./scripts/envs.sh"


if [ -z "$DEPLOYMENT_NAME" ]; then
    echo "Please sure that DEPLOYMENT_NAME exists"
    exit 1
fi

if [ "$DEPLOYMENT_NAME" == "Production" ]; then
    echo "You can't use reserved name 'Production' for deployment"
    exit 1
fi

if [ -z "$APPCENTER_ACCESS_TOKEN" ]; then
    echo "Please sure that APPCENTER_ACCESS_TOKEN exists"
    exit 1
fi

if [ "$PLATFORM" != "ios" ] && [ "$PLATFORM" != "android"  ]
then
    echo "Please sure that you set PLATFORM env variable (ios | android)"
    exit 1
fi

APP_CENTER_APP_NAME="$APP_CENTER_APP_NAME_ANDROID"

if [ "$PLATFORM" == "ios" ]; then
    APP_CENTER_APP_NAME="$APP_CENTER_APP_NAME_IOS"
fi


appcenter codepush deployment add -a "$APP_CENTER_ORG_NAME/$APP_CENTER_APP_NAME" "$DEPLOYMENT_NAME" || true # Ignore "deployment named test-build already exists" error
appcenter codepush release-react -a "$APP_CENTER_ORG_NAME/$APP_CENTER_APP_NAME" -d "$DEPLOYMENT_NAME" --target-binary-version "*" --description "$DESCRIPTION"
