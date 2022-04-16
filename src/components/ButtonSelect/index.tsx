import React from 'react';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';
interface ButtonSelectProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactElement;
  buttonLabel: string;
  disabled?: boolean; // disable all button select
  disabledLeft?: boolean; //disabled button
  disabledRight?: boolean; // disabled dropdown
}

const ButtonSelect = (props: ButtonSelectProps) => {
  const {
    onClick,
    children,
    buttonLabel = '',
    disabled = false,
    disabledLeft = false,
    disabledRight = false,
  } = props;
  return (
    <Dropdown.Button
      onClick={onClick}
      overlay={children}
      icon={<DownOutlined />}
      className={styles.button}
      disabled={disabled}
      buttonsRender={([leftButton, rightButton]: any) => [
        React.cloneElement(leftButton, { disabled: disabledLeft }),
        React.cloneElement(rightButton, { disabled: disabledRight }),
      ]}
    >
      {buttonLabel}
    </Dropdown.Button>
  );
};

export default ButtonSelect;
