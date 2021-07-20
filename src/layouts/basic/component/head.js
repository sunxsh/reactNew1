import React, { memo, useMemo } from 'react'
import { Dropdown, Menu, Spin } from 'antd'
import { Link } from "react-router-dom"
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { FullScreeOut } from '@/components/layoutTable'
import { useDispatch, useSelector } from 'react-redux';
import HeadImage from '@/components/headImage'
import style from './head.module.scss'
import { responsiveConfig } from '@/utils/varbile'
import { confirm } from '@/utils/function'
import { useHistory } from "react-router-dom";
import { localStorage } from '@/assets/js/storage'
import { createSelector } from 'reselect'
import News from './new'
import { getMenuTree,loadingMenuTree as loadingMenuTreeAction,loadingUserInfo as loadingUserInfoAction } from '@/redux/action/user'

const TopBar = memo(function TopBar({ collapsed, onToggle, width, setIsMobileDrawer }) {

  const history = useHistory();

  const dispatch = useDispatch();
  const selectNumOfDoneTodos = createSelector(
    [(state) => state.user.getUserInfo, (state) => state.user.loadingUserInfo],
    (getUserInfo, loadingUserInfo) => [getUserInfo, loadingUserInfo]
  );

  const [getUserInfo, loadingUserInfo] = useSelector(selectNumOfDoneTodos);

  const isMobileDevice = useMemo(() => width < responsiveConfig.mobileInnerWidth ? true : false, [width]);

  const tagOption = ({ key }) => {
    if (key === '2') {
      confirm(async () => {
        localStorage.clear();
        history.push(`/login?rp=${+new Date()}`);
        dispatch(loadingMenuTreeAction(false));
        dispatch(loadingUserInfoAction(false));
        dispatch(getMenuTree([])); // 防止数据出现重影的现象
      }, '确定要退出登录吗？');
    }
  }

  const dropdown = () => (
    <Menu onClick={tagOption}>
      <Menu.Item key='1'>
        <Link to="/userInfo">
          <UserOutlined />
          <span>个人信息</span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2'>
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  const options = () => {
    setIsMobileDrawer(isMobileDevice);
    onToggle(!collapsed);
  }

  return (
    <div className={`${style.head} clearfix`}>
      <div className={`${style.headLeft} fl`}>
        <div className={`${style.menu}`} onClick={options}>
          {collapsed ? <MenuUnfoldOutlined className={style.icon} /> : <MenuFoldOutlined className='icon' />}
        </div>
      </div>
      <div className={`${style.menuList} fr`}>
        <News/>
        <FullScreeOut className={style.icon} />
        <Dropdown overlay={dropdown} placement="bottomCenter">
          <div className={`${style.propsUser}`}>
            {
              loadingUserInfo ? <>
                <HeadImage url={'https://image.gudsen.com/2021/03/18/32a3060d27134fc387cceb52e0089cc7.jpg'} />
                <span>{getUserInfo.username ? getUserInfo.username : '珍珍'}</span>
              </> : <Spin size="small" />
            }
          </div>
        </Dropdown>
      </div>
    </div>
  )
})

export default TopBar;

