/**
 * @description 对对个函数的混入，类似于redux中的compose,主要用来解决react高阶组件多层嵌套的问题
 * @param {...Function} funcs
 * @returns {Function}
 * @author lgf
 */
export function composes(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
