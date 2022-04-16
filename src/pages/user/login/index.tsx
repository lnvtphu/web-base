import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React, { useEffect } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, history } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import * as security from '@/utils/security';

import styles from './index.less';
import UserStorage from '@/storage/user.storage';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const autoLogin = UserStorage.getRemember() !== false;
  const username = UserStorage.getUserName() || '';
  const password = UserStorage.getPassword() || '';
  const intl = useIntl();

  useEffect(() => {
    const accessToken = UserStorage.getToken();
    if (accessToken) {
      history.replace({
        pathname: '/home',
      });
    }
  }, []);

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    const { userName: userNameForm = '', autoLogin: autoLoginForm = false } = values;
    const passwordForm = security.sha256(values.password);
    if (autoLoginForm) {
      UserStorage.setUserName(userNameForm);
      UserStorage.setPassword(values.password);
      UserStorage.setRemember(true);
    } else {
      UserStorage.removeUserName();
      UserStorage.removePassword();
      UserStorage.removeRemember();
    }
    dispatch({
      type: 'auth/login',
      payload: {
        username: userNameForm,
        password: passwordForm,
        keepSignedIn: autoLoginForm,
      },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin,
          userName: username,
          password,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          searchConfig: {
            submitText: intl.formatMessage({ id: 'login.button.submit' }),
          },
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'login.account.login.error.message',
            })}
          />
        )}
        <>
          <ProFormText
            name="userName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'login.username.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="login.username.require" />,
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'login.password.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="login.password.require" />,
              },
            ]}
          />
        </>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="login.remember.me" />
          </ProFormCheckbox>
          {/* <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="login.forgotPassword" />
          </a> */}
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
