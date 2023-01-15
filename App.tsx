import React from 'react';
import {Platform, SafeAreaView, Text} from 'react-native';

import {useSyncOnAppStart} from './codepush/useSyncOnAppStart';
import {
  CodePushDeMenuButton,
  configurateProject,
} from 'react-native-code-push-dev-menu';

configurateProject({
  readonlyAccessToken: Platform.select({
    // Read-only access tokens (https://docs.microsoft.com/en-us/appcenter/api-docs/#creating-an-app-center-app-api-token)
    ios: '128009dc42ded5e71ef21e007a24eb67b5c3279f',
    default: '42f471742864bd9c1917f322918b163a90d13904',
  }),
  appCenterAppName: Platform.select({
    ios: 'MyApp-iOS',
    default: 'MyApp-Android',
  }),
  appCenterOrgName: 'MyOrganizationTest',
});

function App() {
  useSyncOnAppStart();

  return (
    <SafeAreaView>
      <Text>Code Push Demo</Text>
      <CodePushDeMenuButton />
    </SafeAreaView>
  );
}

export default App;
