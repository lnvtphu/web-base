import { accessKeyToList } from '@/utils/utils';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import TableSingle from '../TableSingle';

type ViewMorePopupProps = {
  columns: any;
  dataSource: any;
  title: string;
  hasMore?: boolean;
  children?: string;
  type?: ButtonType;
  className?: string;
};

const ViewMorePopup: React.FC<ViewMorePopupProps> = (props: ViewMorePopupProps) => {
  const [visible, setVisible] = useState(false);
  const { children, columns, title, hasMore, dataSource, type, className } = props;
  return (
    <>
      {hasMore && (
        <Button onClick={() => setVisible(true)} shape="circle" type={type} className={className}>
          {children || <CaretDownOutlined />}
        </Button>
      )}
      <Modal
        visible={visible}
        title={title}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        width={1100}
        bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
      >
        <TableSingle
          bordered
          columns={columns}
          dataSource={accessKeyToList(dataSource)}
          pagination={false}
        />
      </Modal>
    </>
  );
};
export default ViewMorePopup;
