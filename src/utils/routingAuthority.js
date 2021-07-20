/**
 * @author lgf
 * @description 判断当前路由是否拥有权限
 * @param {Object} route 当前路由对象
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (route, resourceCodes) => {
  if (route.auth && Array.isArray(route.auth)) {
    return route.auth.some(code => resourceCodes.includes(code))
  }
  return true
}

/**
 * @author lgf
 * @description 可访问菜单，从 routes 中过滤出 有权限的 menu
 * @param {Array} routes 路由表
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} 有权限的 menu list
 */
export const getAccessMenus = (routes, resourceCodes) => {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, resourceCodes)) {
      if (tmp.routes) {
        tmp.routes = getAccessMenus(tmp.routes, resourceCodes)
        if (tmp.routes.length) {
          res.push({
            path: tmp.path || '',
            title: tmp.title || '',
            icon: tmp.icon || '',
            hidden: tmp.hidden || false,
            routes: tmp.routes
          })
        }
      } else {
        res.push({
          path: tmp.path || '',
          title: tmp.title || '',
          icon: tmp.icon || '',
          hidden: tmp.hidden || false
        })
      }
    }
  })
  return res;
}
