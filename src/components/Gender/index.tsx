import React from 'react';
import { GENDER } from '@/utils/constants';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'umi';
import styles from './index.less';

export type GenderProps = {
  onChange?: (value?: string) => void;
  value?: string;
};

const Gender: React.FC<GenderProps> = (props) => {
  const { value: valueProp = '', onChange } = props;

  const genderEl = GENDER.map((gender: any) => {
    const { value, text } = gender;
    const isChecked = value === valueProp;
    return (
      <Col span={8} key={text}>
        <div
          className={classNames(styles.gender, { [styles.checked]: isChecked })}
          onClick={() => onChange?.(value)}
        >
          <FormattedMessage id={text} />
        </div>
      </Col>
    );
  });
  return <Row gutter={8}>{genderEl}</Row>;
};

export default Gender;
