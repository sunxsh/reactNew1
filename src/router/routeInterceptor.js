import React, { Suspense } from 'react'
import RoterLoading from '@/components/routerLoading'
import { Redirect } from 'react-router-dom'
import { isToken } from '@/utils/varbile'
import { connect } from 'react-redux'
/**
 * @author lgf
 * @description 高阶路由权限拦截
 * @param {React.ComponentType<T>} WrappedComponent
 * @returns  {React.ComponentType<T>} 返回新的组件
 */

function menuRouter(WrappedComponent) {
  class Menu extends React.Component{
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) { // 页面全局捕捉异常
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      // console.log('error', error,info)
    }
    render() {
      const { route,authorityInfoList } = this.props;
      const currentRouter = route;
      const envime = process.env.REACT_APP_ENV;
      if (this.state.hasError && envime!=='dev') { // 页面出错了，就跳转
        this.setState({hasError:false});
        return <Redirect to={{ pathname: '/pageError', search: `?referrer=${Math.random() * 10000}` }} />;
      }
      if (!isToken()) {
         return (<Redirect to={{ pathname: '/login', search: `?referrer=${Math.random() * 10000}` }} />)
      }
      return (
        <>
          <Suspense fallback={<RoterLoading />}>
            <WrappedComponent {...this.props} />
          </Suspense>
        </>
      );
    }
  }
  return connect(({ user }) => ({
    authorityInfoList: user.authorityInfoList
  }))(Menu)
}

export default menuRouter;
