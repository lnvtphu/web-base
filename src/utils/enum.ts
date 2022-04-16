export enum Permissions {
  // Category Management
  View_Category = 'View Category',
  Create_Category = 'Create Category',
  Edit_Category = 'Edit Category',
  Delete_Category = 'Delete Category',
  // Order Management
  View_Customer = 'View Customer',
  Create_Customer = 'Create Customer',
  Edit_Customer = 'Edit Customer',
  Delete_Customer = 'Delete Customer',
  View_Provider = 'View Provider',
  Create_Provider = 'Create Provider',
  Edit_Provider = 'Edit Provider',
  Delete_Provider = 'Delete Provider',
  View_Order = 'View Order',
  Create_Order = 'Create Order',
  Edit_Order = 'Edit Order',
  Delete_Order = 'Delete Order',
  View_Order_History = 'View Order History',
  // Product Management
  Edit_Product = 'Edit Product',
  Delete_Product = 'Delete Product',
  View_Semi_Product = 'View Semi Product',
  Create_Semi_Product = 'Create Semi Product',
  Edit_Semi_Product = 'Edit Semi Product',
  Delete_Semi_Product = 'Delete Semi Product',
  View_Material = 'View Material',
  Create_Material = 'Create Material',
  Edit_Material = 'Edit Material',
  Delete_Material = 'Delete Material',
  View_Product = 'View Product',
  Create_Product = 'Create Product',
  // Production Management
  View_Request_Export_Material_Ticket = 'View Request Export Material Ticket',
  Create_Request_Export_Material_Ticket = 'Create Request Export Material Ticket',
  Edit_Request_Export_Material_Ticket = 'Edit Request Export Material Ticket',
  Delete_Request_Export_Material_Ticket = 'Delete Request Export Material Ticket',
  View_Production_Progress = 'View Production Progress',
  Update_Production_Progress = 'Update Production Progress',
  View_Machining_Progress = 'View Machining Progress',
  Update_Machining_Progress = 'Update Machining Progress',
  Promulgate_Production_Oder = 'Promulgate Production Oder',
  View_Export_Machining_Ticket = 'View Export Machining Ticket',
  Create_Export_Machining_Ticket = 'Create Export Machining Ticket',
  Edit_Export_Machining_Ticket = 'Edit Export Machining Ticket',
  Delete_Export_Machining_Ticket = 'Delete Export Machining Ticket',
  View_Import_Machining_Ticket = 'View Import Machining Ticket',
  Create_Import_Machining_Ticket = 'Create Import Machining Ticket',
  Edit_Import_Machining_Ticket = 'Edit Import Machining Ticket',
  Delete_Import_Machining_Ticket = 'Delete Import Machining Ticket',
  Technical_Inspection_Production_Order = 'Technical Inspection Production Order',
  Purchase_Production_Order = 'Purchase Production Order',
  Update_Production_Progress_Directly = 'Update Production Progress Directly',
  View_Production_Order = 'View Production Order',
  Create_Production_Order = 'Create Production Order',
  Edit_Production_Order = 'Edit Production Order',
  Delete_Production_Order = 'Delete Production Order',
  Approve_Production_Order = 'Approve Production Order',
  Producing_Production_Order = 'Producing Production Order',
  Production_Order_View_Product_List = 'Production Order View Product List',
  Production_Order_Add_Product = 'Production Order Add Product',
  Production_Order_Edit_Product = 'Production Order Edit Product',
  Production_Order_Delete_Product = 'Production Order Delete Product',
  Production_Order_View_Material_List = 'Production Order View Material List',
  Production_Order_Add_Material = 'Production Order Add Material',
  Production_Order_Edit_Material = 'Production Order Edit Material',
  Production_Order_Delete_Material = 'Production Order Delete Material',
  // Quota Management
  View_Product_Quota = 'View Product Quota',
  Create_Product_Quota = 'Create Product Quota',
  Edit_Product_Quota = 'Edit Product Quota',
  Delete_Product_Quota = 'Delete Product Quota',
  View_Semi_Product_Quota = 'View Semi Product Quota',
  Create_Semi_Product_Quota = 'Create Semi Product Quota',
  Edit_Semi_Product_Quota = 'Edit Semi Product Quota',
  Delete_Semi_Product_Quota = 'Delete Semi Product Quota',
  View_Raw_Product_Quota = 'View Raw Product Quota',
  Create_Raw_Product_Quota = 'Create Raw Product Quota',
  Edit_Raw_Product_Quota = 'Edit Raw Product Quota',
  Delete_Raw_Product_Quota = 'Delete Raw Product Quota',
  // Report
  View_Production_Progress_Report = 'View Production Progress Report',
  // Role Management
  View_Role = 'View Role',
  Create_Role = 'Create Role',
  Edit_Role = 'Edit Role',
  Delete_Role = 'Delete Role',
  // Setting
  View_General_Setting = 'View General Setting',
  Update_General_Setting = 'Update General Setting',
  // Stage Management
  View_Stage_Group = 'View Stage Group',
  Create_Stage_Group = 'Create Stage Group',
  Edit_Stage_Group = 'Edit Stage Group',
  Delete_Stage_Group = 'Delete Stage Group',
  View_Stage = 'View Stage',
  Create_Stage = 'Create Stage',
  Edit_Stage = 'Edit Stage',
  Delete_Stage = 'Delete Stage',
  // User Management
  View_User = 'View User',
  Create_User = 'Create User',
  Edit_User = 'Edit User',
  Delete_User = 'Delete User',
  // Warehouse Management
  View_Import_Warehouse_Ticket = 'View Import Warehouse Ticket',
  Create_Import_Warehouse_Ticket = 'Create Import Warehouse Ticket',
  Edit_Import_Warehouse_Ticket = 'Edit Import Warehouse Ticket',
  Delete_Import_Warehouse_Ticket = 'Delete Import Warehouse Ticket',
  View_Warehouse = 'View Warehouse',
  Create_Warehouse = 'Create Warehouse',
  Edit_Warehouse = 'Edit Warehouse',
  Delete_Warehouse = 'Delete Warehouse',
  View_Export_Warehouse_Ticket = 'View Export Warehouse Ticket',
  Create_Export_Warehouse_Ticket = 'Create Export Warehouse Ticket',
  Edit_Export_Warehouse_Ticket = 'Edit Export Warehouse Ticket',
  Delete_Export_Warehouse_Ticket = 'Delete Export Warehouse Ticket',
  View_Request_Export_Warehouse_Ticket = 'View Request Export Warehouse Ticket',
  Create_Request_Export_Warehouse_Ticket = 'Create Request Export Warehouse Ticket',
  Edit_Request_Export_Warehouse_Ticket = 'Edit Request Export Warehouse Ticket',
  Delete_Request_Export_Warehouse_Ticket = 'Delete Request Export Warehouse Ticket',
}

export enum Actions {
  ADD = 'Thêm',
  UPDATE = 'Cập nhật',
  REMOVE = 'Xóa',
}

export enum ProductionCommandField {
  uniqueId = 'Số lệnh sản xuất',
  productionDate = 'Ngày sản xuất',
  orderId = 'Kế hoạch',
  productionPlanId = 'Mã đơn hàng',
  location = 'Nơi sản xuất',
  orderDate = 'Ngày đặt hàng',
  description = 'Ghi chú',
  material = 'Định mức NVL',
  requestBuyMaterials = 'NVL cần mua',
  product = 'Thông tin thành phẩm',
  status = 'Trạng thái',
}