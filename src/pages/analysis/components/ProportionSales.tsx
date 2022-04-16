import { Card, Radio, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import React from 'react';
import type { DataItem } from '../data.d';
import styles from '../style.less';

const { Text } = Typography;

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  const pieConfig: PieConfig = {
    autoFit: true,
    height: 300,
    data: salesPieData,
    radius: 1,
    innerRadius: 0.64,
    angleField: 'y',
    colorField: 'x',
    legend: false,
    label: {
      type: 'spider',
      formatter: (text, item) => {
        // eslint-disable-next-line no-underscore-dangle
        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
      },
    },
    statistic: {
      title: {
        content: 'Bán hàng',
      },
    },
  };

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Tỉ lệ sản phẩm đã bán"
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="online">Trực tuyến</Radio.Button>
              <Radio.Button value="stores">Tại cửa hàng</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        <Text>Bán hàng</Text>
        <Pie {...pieConfig} />
      </div>
    </Card>
  );
};

export default ProportionSales;
