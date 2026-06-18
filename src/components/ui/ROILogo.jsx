

import { Image } from 'react-native';

export function ROILogo({ width = 130 }) {
  const height = Math.round(width / 1.92);

  return (
  <Image
    source={{ uri: 'https://raw.githubusercontent.com/Lucas-Hume/ROI_assets/main/assets/ROI_logo.jpg' }}
    style={{ width, height: Math.round(width / 1.92) }}
    resizeMode="contain"
    accessibilityLabel="Red Opal Innovations"
  />
);
}
