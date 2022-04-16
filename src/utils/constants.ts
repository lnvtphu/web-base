export const DISPLAY_COMMAND_PRODUCTION_LIMIT = 3;

export const API_TYPE = {
  CORE: 'CORE',
  PRODUCT: 'PRODUCT',
  WAREHOUSE: 'WAREHOUSE',
  EXPORT: 'EXPORT',
};

export const GENDER = [
  {
    text: 'common.gender.male',
    isChecked: true,
    value: 'Male',
  },
  {
    text: 'common.gender.female',
    isChecked: false,
    value: 'Female',
  },
  {
    text: 'common.gender.other',
    isChecked: false,
    value: 'Other',
  },
];

export const PRODUCTION_COMMAND_STATUS_STEP = {
  Promulgate: {
    step: 0,
    name: 'Ban hành LSX',
    value: 'Promulgate',
    color: null,
  },
  TechnicalInspection: {
    step: 1,
    name: 'Kiểm tra kỹ thuật',
    value: 'TechnicalInspection',
    color: 'cyan',
  },
  Purchase: {
    step: 2,
    name: 'Mua hàng',
    value: 'Purchase',
    color: 'purple',
  },
  ApprovalPlan: {
    step: 3,
    name: 'Kế hoạch duyệt',
    value: 'ApprovalPlan',
    color: 'lime',
  },
  Producing: {
    step: 4,
    name: 'Sản xuất',
    value: 'Producing',
    color: 'blue',
  },
  Warehouse: {
    step: 5,
    name: 'Nhập kho TP',
    value: 'Warehouse',
  },
  DelayProgress: {
    step: 6,
    name: 'Trễ tiến độ',
    value: 'DelayProgress',
    color: 'orange',
  },
  Completed: {
    step: 7,
    name: 'Hoàn thành',
    value: 'Completed',
    color: 'green',
  },
  Rejected: {
    step: 8,
    name: 'Từ chối',
    value: 'Rejected',
    color: 'red',
  },
};

export const PRODUCT_STATUS_STEP = {
  Producing: {
    step: 0,
    name: 'Sản xuất',
  },
  Warehouse: {
    step: 1,
    name: 'Nhập kho TP',
  },
  Completed: {
    step: 2,
    name: 'Hoàn thành',
  },
};

export const STAGE_TYPE = {
  Raw: {
    label: 'Phôi',
    value: 'Raw',
    updateProgress: 'Cập nhật tiến độ',
    updateProgressRoute: null,
  },
  Producing: {
    label: 'Sản xuất',
    value: 'Producing',
    updateProgress: 'Cập nhật tiến độ',
    updateProgressRoute: null,
  },
  Machining: {
    label: 'Gia công',
    value: 'Machining',
    updateProgress: 'Nhập/Xuất gia công',
    updateProgressRoute: '/thong-tin-san-xuat/gia-cong/tien-do',
  },
  Pack: {
    label: 'Hoàn thiện',
    value: 'Pack',
    updateProgress: 'Hoàn thành',
    updateProgressRoute: null,
  },
};

export const SORT_KEYS = {
  ascend: 'asc',
  descend: 'desc',
};

export const CATEGORIES_KEY = {
  USER: 'User',
  PRODUCT: 'Product',
  SEMI_PRODUCT: 'SemiProduct',
  RAW_PRODUCT: 'RawProduct',
  MATERIAL: 'Material',
  OUT_MACHINING: 'OutMachining',
};

export const CATEGORIES_TYPE = {
  CATEGORY: 'Category',
  PROPERTY: 'Property',
  UNIT: 'Unit',
  MATERIAL: 'Material',
};

export const CATEGORIES_TYPE_ARR = [
  {
    value: CATEGORIES_TYPE.PROPERTY,
    label: 'Thuộc tính',
  },
  {
    value: CATEGORIES_TYPE.UNIT,
    label: 'Đơn vị',
  },
  {
    value: CATEGORIES_TYPE.MATERIAL,
    label: 'Nguyên vật liệu',
  },
];

export const KEY_UPDATE_PRODUCTION_PROGRESS = {
  SEMI_PRODUCT: 'semiProductId-',
  RAW_PRODUCT: 'rawProductId-',
  PRODUCT: 'productId-',
};

export const KEY_FORM = {
  SWITCH: 'switch-',
};

export const COLOR_TAG = [
  '#FF9DDB', // 0
  '#5D94FB', // 1
  '#FCDD2D', // 2
  '#A478FB', // 3
  '#CC9933', // 4
  '#ff6333', // 5
  '#00ff00', // 6
  '#0004ff', // 7
  '#00FFF9', // 8
  '#c3ff00', // 9
  '#ff0000', // 10
  '#2e6600', // 11
  '#004966', // 12
  '#862d59', // 13
  '#66ffff', // 14
  '#009900', // 15
  '#008080', // 16
  '#ff1ac6', // 17
  '#00ffcc', // 18
  '#ffbf80', // 19
  '#77b300', // 20
  '#c266ff', // 21
];

export const DATE_TIME_FORMAT = {
  DATE_API: 'YYYY-MM-DD',
  DATE_DISPLAY: 'DD/MM/YYYY',
};

export const MACHINING_STATUS = {
  All: {
    label: 'Tất cả',
    value: 'New,Exported',
  },
  New: {
    label: 'Mới',
    value: 'New',
  },
  Imported: {
    label: 'Nhập gia công',
    value: 'Imported',
  },
  Exported: {
    label: 'Xuất gia công',
    value: 'Exported',
  },
};

export const MACHINING_EXPORT_STATUS_STEP = {
  New: {
    step: 0,
    name: 'Khởi tạo',
    value: 'New',
  },
  Exported: {
    step: 1,
    name: 'Xuất gia công',
    value: 'Exported',
  },
  Done: {
    step: 2,
    name: 'Hoàn thành',
    value: 'Done',
  },
};

export const MACHINING_IMPORT_STATUS_STEP = {
  New: {
    step: 0,
    name: 'Khởi tạo',
    value: 'New',
  },
  Done: {
    step: 2,
    name: 'Hoàn thành',
    value: 'Done',
  },
};

export const ORDER_STATUS = {
  All: {
    label: 'Tất cả',
    value: 'All',
  },
  New: {
    label: 'Đang đặt hàng',
    value: 'New',
    color: 'blue',
  },
  Approved: {
    label: 'Đã duyệt đơn',
    value: 'Approved',
    color: 'green',
  },
  Production: {
    label: 'Sản xuất',
    value: 'Production',
    color: 'purple',
  },
  Delivery: {
    label: 'Giao hàng',
    value: 'Delivery',
    color: 'cyan',
  },
  Complete: {
    label: 'Hoàn thành',
    value: 'Complete',
    color: 'orange',
  },
  Transport: {
    label: 'Đang vận chuyển',
    value: 'Transport',
    color: 'green',
  },
  ReceiveWarehouse: {
    label: 'Đã nhập kho',
    value: 'ReceiveWarehouse',
    color: 'purple',
  },
};

export const ORDER_ACTION = {
  APPROVED: 'Approved',
  DELIVERY: 'Delivery',
  COMPLETE: 'Complete',
  TRANSPORT: 'Transport',
  RECEIVE_WAREHOUSE: 'ReceiveWarehouse',
};

export const DEFAULT_SETTING = {
  MATERIAL_ID: 'MATERIAL_ID',
  PRODUCT_ID: 'PRODUCT_ID',
  SUB_PRODUCT_ID: 'SUB_PRODUCT_ID',
  SEMI_PRODUCT_ID: 'SEMI_PRODUCT_ID',
  PREFIX: 'prefix',
  SUFFIX: 'suffix',
  MAX_LENGTH: 7,
};

export const SETTING_TITLE = {
  MATERIAL_ID: 'Mã nguyên vật liệu',
  PRODUCT_ID: 'Mã thành phẩm',
  SUB_PRODUCT_ID: 'Mã thành phẩm con',
  SEMI_PRODUCT_ID: 'Mã bán thành phẩm',
  MACHINING_IMPORT_ID: 'Mã phiếu nhập gia công',
  MACHINING_EXPORT_ID: 'Mã phiếu xuất gia công',
  ORDER_SUPPLIER_ID: 'Mã đơn hàng từ nhà cung cấp',
  ORDER_CUSTOMER_ID: 'Mã đơn hàng từ khách hàng',
  WAREHOUSE_EXPORT_ID: 'Mã phiếu xuất kho',
  WAREHOUSE_IMPORT_ID: 'Mã phiếu nhập kho',
  EXPORT_REQUEST_EXPORT_MATERIAL_ID: 'Mã phiếu xuất đề nghị xuất vật tư',
  REQUEST_EXPORT_MATERIAL_ID: 'Mã phiếu đề nghị xuất vật tư',
  PRODUCTION_ORDER_ID: 'Mã lệnh sản xuất',
  RAW_PRODUCT: 'Mã phôi',
};

export const WAREHOUSE_GROUP = {
  MATERIAL: 'warehouse_material',
  SEMI_PRODUCT: 'warehouse_semi_product',
  PRODUCT: 'warehouse_product',
};

export const IMPORT_STATUS = {
  New: {
    label: 'Lập phiếu',
    value: 'New',
    color: 'blue',
  },
  Accepted: {
    label: 'Nhập kho',
    value: 'Accepted',
    color: 'green',
  },
};

export const EXPORT_STATUS = {
  New: {
    label: 'Lập phiếu',
    value: 'New',
    color: 'blue',
  },
  Accepted: {
    label: 'Xuất kho',
    value: 'Accepted',
    color: 'green',
  },
};

export const REQUEST_EXPORT_STATUS = {
  New: {
    label: 'Chưa xuất',
    value: 'New',
    color: 'blue',
  },
  Accepted: {
    label: 'Đã xuất',
    value: 'Accepted',
    color: 'green',
  },
  Reject: {
    label: 'Đã từ chối',
    value: 'Reject',
    color: 'red',
  },
};

export const WAREHOUSE_IMPORT_TYPE = {
  MANUAL: 'Manual',
  PROGRESS_PRODUCTION: 'ProgressProduction',
};

export const FILE_TYPE = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  PDF: 'application/pdf',
  JPG: 'image/jpg',
  IMAGE: 'Image',
  AUDIO: 'Audio',
  VIDEO: 'Video',
};

export const CATEGORY_FILE_NAME = {
  CUSTOMER_AVATAR: 'CustomerAvatar',
  CUSTOMER_ATTACHMENT: 'CustomerAttachment',
  SUPPLIER_AVATAR: 'SupplierAvatar',
  SUPPLIER_ATTACHMENT: 'SupplierAttachment',
  ORDER_CUSTOMER_ATTACHMENT: 'OrderCustomerAttachment',
  ORDER_SUPPLIER_ATTACHMENT: 'OrderSupplierAttachment',
};

export const COMMAND_BY_TYPE = {
  ProductionPlan: {
    value: 0,
  },
  OrderPlan: {
    value: 1,
  },
  Option: {
    value: 2,
  },
};

export const REQUEST_EXPORT_MATERIAL_TYPE = {
  PRODUCTION_ORDER: 'PRODUCTION_ORDER',
  NORMAL: 'NORMAL',
};

export const EXPORT_TYPE = {
  REQUEST_EXPORT_MATERIAL: 'REQUEST_EXPORT_MATERIAL',
};

export const ROLES = {
  SYSTEM_ADMIN: 'System Admin',
};

export const IMPORT_STATE = {
  INIT: 'IN_IT',
  DATA_MAPPING: 'DATA_MAPPING',
  ADJUST_MAPPING: 'ADJUST_MAPPING',
  RESULT: 'RESULT',
};

export const IMPORT_PRODUCT = {
  PRODUCT_UNIQUE_ID: 'PRODUCT_UNIQUE_ID',
  PRODUCT_NAME: 'PRODUCT_NAME',
  PRODUCT_STAGE: 'PRODUCT_STAGE',
  SUB_PRODUCT_UNIQUE_ID: 'SUB_PRODUCT_UNIQUE_ID',
  SUB_PRODUCT_NAME: 'SUB_PRODUCT_NAME',
  SEMI_PRODUCT_NAME: 'SEMI_PRODUCT_NAME',
  SEMI_PRODUCT_WEIGHT: 'SEMI_PRODUCT_WEIGHT',
  RAW_PRODUCT_NAME: 'RAW_PRODUCT_NAME',
  RAW_PRODUCT_QUANTITY: 'RAW_PRODUCT_QUANTITY',
  _rowNum: '__rowNum__',
  _stt: '_stt',
  _name: '_name',
  _rawQuantity: '_rawQuantity',
  _rawPropertyProfile: '_rawPropertyProfile',
  _rawPropertyShape: '_rawPropertyShape',
  _rawWeight: '_rawWeight',
};

export const EXCEL_FILE_TYPE = ['.xlsx', '.xls'];

export const BYTE_FILE_LIMIT = 2097152; // 2MB
