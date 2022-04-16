import React from 'react';
import { Table, Collapse, Space } from 'antd';
import TableSingle from '@/components/TableSingle';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import styles from './index.less';
import { accessKeyToList } from '@/utils/utils';

type TableExpandProps<RecordType> = {
  columnsExpand: ColumnsType<RecordType>;
  columns: ColumnsType<RecordType>;
  dataSource: RcTableProps<RecordType>['data'];
  pagination: false | TablePaginationConfig;
  keyLabelExpand?: string;
  keyTableExpand: string;
  onChange?: any;
  rowKey?: any;
};

const { Panel } = Collapse;

export const TableExpand: React.FC<TableExpandProps<any>> = (props: TableExpandProps<any>) => {
  const expandedRowRender = (recordTableExpand: any[]) => {
    const { columnsExpand = [] } = props;
    const cloneColumnExpand = accessKeyToList(recordTableExpand);
    return (
      <Table
        id={Date.now().toString()}
        key={Date.now().toString()}
        columns={columnsExpand}
        dataSource={cloneColumnExpand}
        pagination={false}
      />
    );
  };
  const labelExpandedRowRender = (recordLabelExpand: any[]) => {
    const { keyTableExpand = '' } = props;
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {recordLabelExpand.map((row: any, index: number) => {
          return (
            <Collapse key={index.toString()} collapsible="header" defaultActiveKey={['0']}>
              <Panel header={row.name} key={index.toString()}>
                {expandedRowRender(row[keyTableExpand])}
              </Panel>
            </Collapse>
          );
        })}
      </Space>
    );
  };
  return (
    <TableSingle
      {...props}
      className={styles.tableExpended}
      expandable={{
        rowExpandable: (record: any) => {
          const { keyLabelExpand = '', keyTableExpand = '' } = props || {};
          const elementChildByKeyTable = record[keyTableExpand] || [];
          const elementChildByKeyLabel = record[keyLabelExpand] || [];
          return elementChildByKeyTable.length || elementChildByKeyLabel.length;
        },
        expandedRowRender: (record: any) => {
          const { keyLabelExpand = '', keyTableExpand = '' } = props || {};
          const expandedRow = record[keyLabelExpand] || [];
          if (keyLabelExpand) {
            return labelExpandedRowRender(expandedRow);
          }
          return expandedRowRender(record[keyTableExpand]);
        },
      }}
    />
  );
};
