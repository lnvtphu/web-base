import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const TextTypography: React.FC = (props: any) => {
  return <Text>{props.value}</Text>;
};
export default TextTypography;
