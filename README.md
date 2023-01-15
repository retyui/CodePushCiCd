# CodePushCiCd

![](https://miro.medium.com/max/640/1*aawxCX-znywlePAPckTzaA.gif)

- Full Article: https://retyui.medium.com/stop-having-to-paying-for-slow-react-native-ios-builds-eeaa9de5d283
  - CI/CD [`.github/workflows/non_prod_codepush.yml`](https://github.com/retyui/CodePushCiCd/blob/main/.github/workflows/non_prod_codepush.yml), [`scripts/codepush-non-prod.sh`](https://github.com/retyui/CodePushCiCd/blob/main/scripts/codepush-non-prod.sh)
  - Client core part [`codepush/useSyncOnAppStart.ts`](https://github.com/retyui/CodePushCiCd/blob/main/codepush/useSyncOnAppStart.ts)
  - Client dev menu part [`react-native-code-push-dev-menu`](https://github.com/retyui/react-native-code-push-dev-menu) + [`App.tsx`](https://github.com/retyui/CodePushCiCd/blob/main/App.tsx))
  - [Git diff of installing `react-native-code-push` on React Native 0.70.x](https://github.com/retyui/CodePushCiCd/commit/5cab326370e6523c4bdefaec2f2fbf39aa8929f6)


To make codepush release

```bash
# Required
export APPCENTER_ACCESS_TOKEN=xxxx
export DEPLOYMENT_NAME=my-branch-name
# Optional
export DESCRIPTION="My desc..."

PLATFORM=ios ./scripts/codepush-non-prod.sh # Codepush release for iOS
PLATFORM=android ./scripts/codepush-non-prod.sh # Codepush release for Android
```

**Demo:**

https://user-images.githubusercontent.com/4661784/212563326-78cadd3e-a698-4c9e-8541-233ed70504ab.mov
