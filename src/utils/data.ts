import moment from 'moment';
import { COMMAND_BY_TYPE, DATE_TIME_FORMAT } from '@/utils/constants';
import { ReportMassOfIron } from '@/interface/production-progress';
import { fixedNumber, stringToASCII } from './utils';

export const formatQuotaMaterial = (quotas: any[] = []) => {
  return quotas.map((quota: any) => {
    const { stageString = '', productString = '' } = quota;
    return {
      ...quota,
      cannotDelete: true,
      stageNames: stageString,
      productName: productString,
    };
  });
};

export const formatMaterialNorms = (materialNorms: any[] = []) => {
  return materialNorms.map((material) => {
    const { stageNames = [], cannotDelete } = material;
    let newMaterial = { ...material };
    if (cannotDelete || (!Array.isArray(stageNames) && stageNames)) {
      newMaterial.stageNames = newMaterial.stageNames.split(', ');
      delete newMaterial.cannotDelete;
    }
    delete newMaterial.materialProperty;
    delete newMaterial.materialName;
    delete newMaterial.materialUniqueId;
    delete newMaterial.unit;
    return newMaterial;
  });
};

export const getMaterialRequestFromQuota = (quotas: any[] = []) => {
  const materialRequest: any[] = [];
  quotas.forEach((quota: any) => {
    const { amount = 0, inventory = 0, materialProperty } = quota;
    if (amount > inventory) {
      materialRequest.push({
        ...quota,
        amount: amount - inventory,
        properties: materialProperty,
        min: amount - inventory,
      });
    }
  });
  return materialRequest;
};

export const formatProductionCommandDetail = (data: any) => {
  const {
    productionOrderMaterials = [],
    productionOrderProducts = [],
    requestBuyMaterials = [],
    productionPlanId = '',
    location = '',
    productionDate = '',
    description = '',
    orderDate = '',
    orderId = '',
    uniqueId = '',
  } = data;
  const requestBuyMaterialsData = requestBuyMaterials || [];
  const productionOrderMaterialsData = productionOrderMaterials || [];
  const productionOrderProductsData = productionOrderProducts || [];
  const productionOrderMaterialsNew = productionOrderMaterialsData.map((materialNorm: any) => {
    const {
      amount = 0,
      stageString = '',
      productString = '',
      material: { id = '', name = '', properties = [], uniqueId = '', unit = '' } = {},
    } = materialNorm;
    return {
      amount,
      unit,
      stageNames: stageString,
      materialUniqueId: uniqueId,
      materialId: id,
      materialName: name,
      materialProperty: properties,
      productName: productString,
    };
  });
  const requestBuyMaterialsNew = requestBuyMaterialsData.map((materialRequest: any) => {
    const {
      amount = 0,
      materialId,
      material: { uniqueId = '', unit = '', name = '', properties = [] } = {},
    } = materialRequest;
    return {
      unit,
      amount,
      materialProperty: properties,
      materialId,
      materialUniqueId: uniqueId,
      materialName: name,
    };
  });
  const productionOrderProductsNew = productionOrderProductsData.map((product: any) => {
    const {
      amount = 0,
      productId = '',
      product: { name = '', uniqueId = '', imageUrl = '' } = {},
    } = product;
    return { amount, productId, uniqueId, name, imageUrl };
  });
  let productionCommandBy = COMMAND_BY_TYPE.Option.value;
  let productionCommandByValue = '';
  if (orderId) {
    productionCommandBy = COMMAND_BY_TYPE.OrderPlan.value;
    productionCommandByValue = orderId;
  } else if (productionPlanId) {
    productionCommandBy = COMMAND_BY_TYPE.ProductionPlan.value;
    productionCommandByValue = productionPlanId;
  }
  return {
    formData: {
      location,
      uniqueId,
      description,
      productionDate: moment(productionDate, DATE_TIME_FORMAT.DATE_API),
      orderDate: orderDate ? moment(orderDate, DATE_TIME_FORMAT.DATE_API) : moment(),
      productionPlanId,
      productionCommandBy,
      productionCommandByValue,
    },
    productionOrderProducts: productionOrderProductsNew,
    requestBuyMaterials: requestBuyMaterialsNew,
    productionOrderMaterials: productionOrderMaterialsNew,
  };
};

export const getFinishedProductOption = (
  finishedProducts: any[],
  stageGroupIdParent: string = '',
): any[] => {
  return finishedProducts.map((product: any) => {
    const { subProducts = [], id: productId, name, stageGroupId, uniqueId } = product;
    if (subProducts && subProducts.length) {
      return {
        value: productId,
        title: `[${uniqueId}] - ${name}`,
        product,
        children: getFinishedProductOption(subProducts, stageGroupId),
      };
    }
    const productNew = stageGroupIdParent
      ? { ...product, stageGroupId: stageGroupIdParent }
      : product;
    return { value: productId, title: `[${uniqueId}] - ${name}`, product: productNew };
  });
};

export const getFinishedProductOptionWithoutChild = (finishedProducts: any[]): any[] => {
  return finishedProducts.map((product: any) => {
    const { id: productId, name, uniqueId } = product;
    return { value: productId, title: `[${uniqueId}] - ${name}`, product };
  });
};

export const formatMassOfIron = (reportMassOfIron: ReportMassOfIron) => {
  const { tableData = [], chartData = [] } = reportMassOfIron;
  const columns: any[] = [];
  const chartDataFormat = chartData.map((cData) => {
    const { stageName, data, stageType } = cData;
    const key = stringToASCII(stageName);
    columns.push({
      key,
      title: `${stageName} (${stageType === 'Pack' ? 'm³' : 'kg'})`,
      dataIndex: key,
    });
    const dataFormatDate = data.map((dF) => {
      const { date } = dF;
      return {
        ...dF,
        date: moment(date).format('DD/MM'),
      };
    });
    return {
      ...cData,
      data: dataFormatDate,
    };
  });

  const tableDataFormat = tableData.map((tData) => {
    const { date, data } = tData;
    const dataObj = {};
    data.forEach((d) => {
      const { key, value } = d;
      const property = stringToASCII(key);
      dataObj[property] = fixedNumber(2, value);
    });
    return { ...dataObj, date };
  });

  return { columns, tableDataFormat, chartDataFormat };
};
