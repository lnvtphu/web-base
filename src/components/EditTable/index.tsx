import React, { useContext, useState, useEffect, useRef } from 'react';
import './index.css';
import { Input, Form, InputNumber } from 'antd';
import TableSingle from '@/components/TableSingle';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  type,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  const isNumber = type === 'number';

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {isNumber ? (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} max={max} min={min} />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditTable = ({ columns, dataSource, onSave, ...restProps }) => {
  const [columnsEdit, setColumns] = useState([]);
  const [dataSourceEdit, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(columns);
  }, [columns]);
  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);

  const handleSave = (row: any) => {
    const newData: any = [...dataSourceEdit];
    const index = newData.findIndex((item: any) => row.id === item.id);
    const item: any = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    onSave(newData, row, item);
  };

  const columnsEditFormat = columnsEdit.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <TableSingle
      components={components}
      rowClassName={() => 'editable-row'}
      dataSource={dataSourceEdit}
      columns={columnsEditFormat}
      {...restProps}
    />
  );
};

export default EditTable;
