import {Platform} from 'react-native';

const CODE_PUSH_IOS_PROD_KEY = 'Gbsg8cTjdcSWOwgJEOEHqk8VE1x6ITThqvNe0';
const CODE_PUSH_ANDROID_PROD_KEY = 'Ob7LrQg_w-l4w1SOLDYT5XBw76_6Pz-NVCed1';

export const CODE_PUSH_PROD_KEY = Platform.select({
  ios: CODE_PUSH_IOS_PROD_KEY,
  default: CODE_PUSH_ANDROID_PROD_KEY,
});
