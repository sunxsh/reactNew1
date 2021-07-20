import React from 'react'
import { Menu, Layout, Empty, Switch, Tooltip } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { SAGA_GETMENUTREE } from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import SvgIcon from '@/components/svgIcon'
import style from './slideNav.module.scss'
import { backTopAnimate } from '@/utils/function';
import LoadingData from '@/components/routerLoading'
import { composes } from '@/utils/compose'
import { BulbOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
class SlideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      lastOpenKeys: [],
      collapsed: false,
      theme:'light'
    };
  }

  componentWillUnmount() {
    this.unlisten(); // 取消监听
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => { // 这样可以监听全局路由的变化
      backTopAnimate(document.querySelector('#content'), 10);
      this.defaultOpenUrl(location.pathname);
    });
    this.props.dispatch({ type: SAGA_GETMENUTREE });

    this.defaultOpenUrl(this.props.location.pathname);
  }

  rednerMenu = (getMenuTree) => {
    const { SubMenu } = Menu;
    return getMenuTree.map((item) => {
      if (!item.routes) {
        return (<Menu.Item key={item.path} icon={item.icon ?
          <SvgIcon iconClass={item.icon} className={ item.icon ==='fba' ? 'smallSvg-style' : 'svg-style' } />: null}>
          <Link to={{ pathname: item.path, state: item.title }}>{item.title}</Link>
          </Menu.Item>);
      } else {
        return (
          <SubMenu key={item.path} icon={item.icon ? <SvgIcon iconClass={item.icon}
          className={ item.icon ==='fba' ? 'smallSvg-style' : 'svg-style' }/> : null} title={item.title}>
            {this.rednerMenu(item.routes)}
          </SubMenu>
        )
      }
    })
  }
  /**
   *
   * @issue  菜单折叠后，子菜单不消失的 问题，和闪烁的问题
   * @cause  菜单折叠后，openKeys 并没有清空
   * @address https://github.com/ant-design/ant-design/issues/14536
   * @borrow  https://github.com/qyhever/e-admin-react/blob/master/src/layouts/Sidebar.js
   */
   static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed) {
      if (props.collapsed) {
        state.lastOpenKeys = state.openKeys;
        return {
          collapsed: props.collapsed,
          openKeys: []
        }
      }
      return {
        collapsed: props.collapsed,
        openKeys: state.lastOpenKeys
      }
    }
    return null
  }

  onOpenChange = (openKeys) => {
    const rootSubmenuKeys = this.props.getMenuTree.map(item => item.path);
    const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  defaultOpenUrl = (url) => { // 获取当前页的路劲，防止刷新看不到选中的样式
    let openKeys = [], arrUrl = [];
    arrUrl = url.split('/'); arrUrl.splice(0, 1);
    if (arrUrl.length <= 2) {
      openKeys.push(`/${arrUrl[0]}`)
    } else { // 如果有超过2层的，就执行
      let str = '', newArr = [];
      arrUrl.forEach((item, index) => {
        if (index <= arrUrl.length - 2) { // 不计算最后一个
          str += `/${item}`;
          newArr.push(str);
        }
      })
      openKeys.push(...newArr)
    }
    this.setState({ openKeys, lastOpenKeys: openKeys });
  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  render() {
    const { Sider } = Layout;
    const { getMenuTree, collapsed, location, loadingMenuTree } = this.props;
    const { openKeys , theme } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const defaultSelectedKeys = location.pathname;
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={collapsed ? 80 : 200} className={theme === 'light' ? 'ant-layout-sider-light' : 'ant-layout-sider-dark'}>
          <div className={theme === 'light' ?`${style.logon} ${style.Shadow}`:`${style.logon}`}>
            <Link to="/home">
              <SvgIcon iconClass='logon' fontSize='30px' />
              <CSSTransition in={!collapsed} classNames="fade" timeout={200} unmountOnExit>
                 <h2>ASINMASTER</h2>
               </CSSTransition>
            </Link>
          </div>
          <div className={style.menuContainer}>
            {
              loadingMenuTree ?
                (getMenuTree.length ? (<Menu mode="inline"
                  onOpenChange={this.onOpenChange}
                  defaultSelectedKeys={[defaultSelectedKeys]}
                  selectedKeys={[defaultSelectedKeys]}
                  defaultOpenKeys={openKeys}
                  {...defaultProps}
                  theme={theme}
                  className={style.menu}>
                    {this.rednerMenu(getMenuTree)}
                </Menu>) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={style.empty} />) : <LoadingData />
            }
          </div>
          <div className={style.switchThem}>
            {/* <CSSTransition in={!collapsed} classNames="fade" timeout={200} unmountOnExit>
              <Tooltip placement="leftTop" title='主题'>
                <BulbOutlined />
              </Tooltip>
            </CSSTransition> */}
            {/* <Switch checkedChildren="dark" unCheckedChildren="light" checked={theme === 'dark'} onChange={this.changeTheme}/> */}
          </div>
        </Sider>
    );
  }
}

const enhance = composes(
  withRouter,
  connect(({ user }) => ({
    getMenuTree: user.getMenuTree,
    loadingMenuTree: user.loadingMenuTree
  }))
)

export default enhance(SlideNav);
