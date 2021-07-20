/**
 * @description 是否测评
 */
export const evaluation = [
  { label: '测试订单', value: true },
  { label: '正常订单', value: false }
];

/**
 * @description 销售渠道
 */
export const SalesChannels = [
  { label: '自定义', value: 1 },
  { label: '速卖通', value: 2 },
  { label: 'Shopify', value: 3 },
  { label: '海外市场', value: 4 },
  { label: 'Ebay', value: 5 },
  { label: '日本乐天', value: 6 },
  { label: '亚马逊测评礼品', value: 7 },
  { label: '亚马逊售后重发', value: 8 }
];

/**
 * @description 站点
 */
export const siteList = [
  { label: '加拿大', value: 'CA', url: 'https://sellercentral.amazon.com' },
  { label: '美国', value: 'US', url: 'https://sellercentral.amazon.com' },
  { label: '墨西哥', value: 'MX', url: 'https://sellercentral.amazon.com' },
  { label: '巴西', value: 'BR', url: 'https://sellercentral.amazon.com.br' },
  { label: '西班牙', value: 'ES', url: 'https://sellercentral-europe.amazon.com' },
  { label: '英国', value: 'GB', url: 'https://sellercentral-europe.amazon.com' },
  { label: '法国', value: 'FR', url: 'https://sellercentral-europe.amazon.com' },
  { label: '德国', value: 'DE', url: 'https://sellercentral-europe.amazon.com' },
  { label: '意大利', value: 'IT', url: 'https://sellercentral-europe.amazon.com' },
  { label: '荷兰', value: 'NL', url: 'https://sellercentral.amazon.nl' },
  { label: '土耳其', value: 'TR', url: 'https://sellercentral.amazon.com.tr' },
  { label: '印度', value: 'IN', url: 'https://sellercentral.amazon.in' },
  { label: '新加坡', value: 'SG', url: 'https://sellercentral.amazon.sg' },
  { label: '澳大利亚', value: 'AU', url: 'https://sellercentral.amazon.com.au' },
  { label: '日本', value: 'JP', url: 'https://sellercentral.amazon.co.jp' },
  { label: '瑞典', value: 'SE', url: 'https://sellercentral.amazon.co.Se' },
  { label: '阿联酋', value: ' AE', url: 'https://sellercentral.amazon.co.Ae' },
];

export const statiscGroup = [
  { label: '总销量', value: 'orderTotalNum' },
  { label: '实际销量', value: 'saleTotalNum' },
  { label: '销售额', value: 'saleTotalMoney' },
];

export const purchaseDate = [
  { label: '近30天', value: 30 },
  { label: '近15天', value: 15 },
  { label: '近7天', value: 7 }
];

export const siteContry = [
  { label: '北美', value: 'NA', url: 'https://sellercentral.amazon.com' }, ,
  { label: '巴西', value: 'BR', url: 'https://sellercentral.amazon.com.br' },
  { label: '欧洲', value: 'EU', url: 'https://sellercentral.amazon.com.br' },
  { label: '荷兰', value: 'NL', url: 'https://sellercentral.amazon.nl' },
  { label: '土耳其', value: 'TR', url: 'https://sellercentral.amazon.com.tr' },
  { label: '印度', value: 'IN', url: 'https://sellercentral.amazon.in' },
  { label: '新加坡', value: 'SG', url: 'https://sellercentral.amazon.sg' },
  { label: '澳大利亚', value: 'AU', url: 'https://sellercentral.amazon.com.au' },
  { label: '日本', value: 'JP', url: 'https://sellercentral.amazon.co.jp' }
];

export const purchaseCheckStatus = [
  { label: '待审核', value: 1 },
  { label: '审核通过', value: 2 },
  { label: '审核拒绝', value: 3 },
  // { label: '部分到货', value:4},
  // { label: '已完成', value:5}
];

export const permissionTypes = [
  { label: '目录', value: 0 },
  { label: '菜单', value: 1 },
  { label: '按钮', value: 2 },
];

export const operationType = [
  { label: '增加', value: 'add' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'delete' },
  { label: '查看', value: 'view' },
  { label: '导出', value: 'export' },
  { label: '导入', value: 'import' },
  { label: '审核', value: 'review' },
];
