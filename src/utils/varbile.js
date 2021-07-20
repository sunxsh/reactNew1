import { siteList, siteContry } from '@/assets/js/staticData'

/**
 * @description 状态码
 */
export const requestCode = {
  failedCode: 1, // 失败
  successCode: 0, // 成功
  serverErrorCode: -1, // 服务端错误
  noVoidToken:102 // 没有token
};

/**
 * @description 响应式的配置参数
 */
export const responsiveConfig = {
  sliderExpansionLeft: 200,
  sliderPackUpLeft: 80,
  sliderMobileLeft: 0,
  collapsedInnerWidth: 1200,
  mobileInnerWidth: 750
}

/**
 * @description token的判断
 * @return {Boolean}
 */
export const isToken = () => localStorage.getItem('token') ? true : false;

/**
 * @author lgf
 * @description node运行环境地址
 * @return {Object} 返回处理之后的对象
 */
export const environment = () => {
  const env = process.env.REACT_APP_ENV;
  let url = null;
  switch (env) {
    case 'dev': // 开发环境下
      url = {
        backendUrl: rootConfig.backend
      };
      break;
    case 'alpha': // 测试环境下
      url = {
        backendUrl: 'http://amazonerp.proxy.gudsen.vip' + rootConfig.backend
      };
      break;
    case 'preprod': // 预发布环境下
      url = 'preprod';
      break;
    case 'prod': // 正式生产环境下
      url = {
        backendUrl: 'https://asinmaster.com' + rootConfig.backend
      };
      break;
    default:
      url = 'development';
      break;
  }
  return url;
}

/**
 * @description 相同的默认值
 */
export const defaultValue = {
  pagaTion: {
    rows: [],
    total: 0
  }
}

/**
 * @description server请求root
 */
export const rootConfig = {
  backend: '/backend-service/gsapi'
}

/**
 *
 * @param {String} code
 * @returns Array
 */
export const filterContryCode = (code) => {
  let getContry = siteList.filter(item => item.value === code);
  return getContry.length ? getContry[0].label : code;
};

export const stationCodeList = (code) => {
  let getContry = siteContry.filter(item => item.value === code);
  return getContry.length ? getContry[0].label : code;
};

/**
 * @description 固定的颜色值
 */
export const colorArr = [
  '#1890ff', // 蓝色-正常
  '#d9d9d9', // 灰色-取消
  '#52c41a', // 绿色-完成，成功
  '#ff4d4f', // 红色-异常，失败
  '#0000d9', // 深蓝-普通
];

/**
 * @author lgf
 * @description 对采购单转态的处理
 * @param {String} state
 */
export const purchaseOrderStatus = (state) => {
  let result = null;
  switch (state) {
    case 1:
      result = { text: '待审核', color: colorArr[1] }
      break;
    case 2:
      result = { text: '审核通过', color: colorArr[2] }
      break;
    case 3:
      result = { text: '审核拒绝', color: colorArr[3] }
      break;
    // case 4:
    //   result = { text:'部分到货',color: colorArr[4] }
    //   break;
    // case 5:
    //   result = { text:'已完成',color: colorArr[0] }
    //   break;
    default:
      result = { text: '待审核', color: colorArr[1] }
      break;
  };
  return result;
}

/**
 * @author lgf
 * @description 是否含有莫个属性number值
 * @param {any} parameter
 * @returns {Number}
 */
export const isAttributesNumber = (parameter) => parameter ? Number(parameter) : 0;

/**
 * @author lgf
 * @description 将空字符串换成undefined | null
 * @param {Object} obj
 * @returns {Object} 新的对象
 */
export const handleAirVal = (obj) => {
  if (typeof obj !== 'object') return;
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const item = obj[key];
      if (typeof item === 'string' && !item) {
        obj[key] = undefined;
      }
    }
  }
  return obj;
}

/**
 * @author lgf
 * @param {Array<any>} list
 * @param {String} id
 * @param {String} idkey id的字段名
 * @param {String} nameKey 返回值得字段名
 * @returns {String}  根据id返回对应的名字
 */
export const characterConversions = (list, id, idkey = 'brandId', nameKey = 'brandName') => {
  return list.length && id ? list.filter(item => item[idkey] === id)[0][nameKey] : undefined;
}

/**
 * @description 默认分页的初始数据
 */
export const defaultPagaTion = {
  page: 1,
  size: 20,
  sort: 'desc'
}

/**
 * @author lgf
 * @description 判断json是否为空
 * @param {Object} json
 * @return {Number} 将有值得数据进行累加
 */
export const isJsonVal = (json) => {
  let jsonLength = 0;
  for (var i in json){
    if(json[i]!==undefined && json[i]!=='undefined' && json[i]!==null){
      jsonLength++;
    }
  }
  return jsonLength;
}
