import React, { useState } from 'react';
import icDown from '@/../public/icons/ic_down.svg';
import styles from './index.less';
import { Card } from 'antd';

type CollapseExpandProps = {
  label: string;
  children: React.ReactElement;
};
const CollapseExpand: React.FC<CollapseExpandProps> = (props: CollapseExpandProps) => {
  const [expanded, setExpanded] = useState(false);
  const { children } = props;
  return (
    <Card
      className={styles.container}
      style={{ paddingLeft: 20, paddingRight: 20, background: 'red' }}
    >
      <div
        className={styles.lableContainer}
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: 12,
          cursor: 'pointer',
        }}
      >
        <img
          className={expanded ? styles.icUp : styles.icDown}
          style={{ marginRight: 10 }}
          src={icDown}
        />
        <span>{props.label}</span>
      </div>
      <div className={expanded ? styles.contentExpanding : styles.contentCollapsing}>
        {children}
      </div>
    </Card>
  );
};

export default CollapseExpand;
