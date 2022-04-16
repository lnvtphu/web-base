import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Bear',
  pwa: false,
  iconfontUrl: '',
  splitMenus: true,
  menu: {
    locale: true,
  },
  headerHeight: 48,
};

export type { DefaultSettings };

export default proSettings;
