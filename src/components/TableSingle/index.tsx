import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

const TableSingle: React.FC<any> = (props: any) => {
  return <Table {...props} className={`${styles.tableContainer} ${props.className}`} />;
};
export default TableSingle;
