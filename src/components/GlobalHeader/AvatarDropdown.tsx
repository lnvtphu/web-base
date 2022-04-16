import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import avatarDefault from '@/assets/default.png';
import UserStorage from '@/storage/user.storage';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'auth/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  componentDidUpdate() {}

  render(): React.ReactNode {
    const currentUserLocal = UserStorage.getUserInfo() || {};
    const { fullName: fullNameLocal = '', imageUrl: imageUrlLocal = '' } = currentUserLocal;
    const {
      menu,
      currentUser: { fullName = fullNameLocal, imageUrl = imageUrlLocal } = {},
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="profile">
            <UserOutlined />
            Tài khoản
          </Menu.Item>
        )}
        {/* {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            Cài đặt
          </Menu.Item>
        )} */}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );
    return fullName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={imageUrl ? imageUrl : avatarDefault}
            alt="avatar"
          />
          <span className={`${styles.name} anticon`}>{fullName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ auth }: ConnectState) => ({
  currentUser: auth.currentUser,
}))(AvatarDropdown);
