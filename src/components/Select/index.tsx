import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

type SelectCommonProps = {
  value?: any;
  disabled?: boolean;
  options: any[];
  placeholder?: React.ReactNode;
  allowClear?: boolean;
  optionFilterExtens?: boolean;
  showUnique?: boolean;
  primaryKey?: string;
  displayKey?: string;
  className?: string;
  mode?: 'multiple' | 'tags';
  onChange?: (value: any, option: any[number] | any) => void;
  onSelect?: (value: any, option: any[number] | any) => void;
};
const SelectCommon: React.FC<SelectCommonProps> = (props: SelectCommonProps) => {
  const [data, setData] = useState<any[]>([]);
  const {
    value,
    disabled = false,
    mode,
    optionFilterExtens = false,
    options,
    placeholder = '',
    showUnique = false,
    allowClear = false,
    primaryKey = 'id',
    displayKey = 'name',
    className,
    onChange,
    onSelect,
  } = props;
  useEffect(() => {
    const getOptions = (items: any[] = []) => {
      if (!Array.isArray(items)) return [];
      return items.map((item) => {
        const { uniqueId } = item;
        let obj: any = {};
        const name = item[displayKey] || '';

        if (showUnique) obj = { label: `[${uniqueId}] - ${name}`, value: item[primaryKey] };
        else obj = { label: name, value: item[primaryKey] };
        if (optionFilterExtens) Object.assign(obj, { ...item });
        return obj;
      });
    };
    setData(getOptions(options));
  }, [options, showUnique, optionFilterExtens, primaryKey]);
  return (
    <Select
      className={className}
      showSearch={true}
      allowClear={allowClear}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      options={data}
      disabled={disabled}
      mode={mode}
      optionFilterProp="label"
      filterOption={(input, option: any) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    />
  );
};

export default SelectCommon;
