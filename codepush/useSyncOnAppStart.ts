import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import CodePush from 'react-native-code-push';

import {CODE_PUSH_PROD_KEY} from '../constants';

const noop = () => {};

const isDeploymentNotFoundError = (error: Error) =>
  error?.message?.includes?.('No deployment found');

function syncOnAppStart() {
  async function start() {
    try {
      // see comment#1
      const runningPackage = await CodePush.getUpdateMetadata(
        CodePush.UpdateState.RUNNING,
      );

      const isNonProduction =
        runningPackage?.deploymentKey &&
        runningPackage.deploymentKey !== CODE_PUSH_PROD_KEY;

      // see comment#2
      const nonProdConfig = {
        // Non-Prod sync (To enable this variant use "Dev Menu" to change deployment)
        deploymentKey: runningPackage?.deploymentKey,
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          // Ask mobile team member before install new version for custom deployment
        },
      };

      // see comment#3
      const prodConfig = {
        // Prod sync (↓↓↓ Default values, see: https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md#codepushoptions)
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        deploymentKey: CODE_PUSH_PROD_KEY,
        rollbackRetryOptions: {
          maxRetryAttempts: 1,
          delayInHours: 24,
        },
      };

      // see comment#4
      const status = await CodePush.sync(
        isNonProduction ? nonProdConfig : prodConfig,
      );

      return status;
    } catch (error) {
      // see comment#5
      if (isDeploymentNotFoundError(error as Error)) {
        return CodePush.clearUpdates();
      }
      // see comment#6
      // trackError(error);
    }
  }

  // see comment#7
  const onAppStateChange = async (newState: AppStateStatus) => {
    if (newState === 'active') {
      await start();
    }
  };

  let unsubscribe = noop;

  start()
    .catch(noop)
    .finally(() => {
      const subscription = AppState.addEventListener(
        'change',
        onAppStateChange,
      );

      unsubscribe = () => subscription.remove();
    });

  return () => {
    unsubscribe();
  };
}

export const useSyncOnAppStart = (): void => {
  useEffect(() => {
    const unsubscribe = syncOnAppStart();

    return unsubscribe;
  }, []);
};
