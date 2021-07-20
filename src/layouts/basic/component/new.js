import React, { memo, useState } from 'react'
import { BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Tabs, List, Button } from 'antd';
import style from './head.module.scss'
import SvgIcon from '@/components/svgIcon';

const New = memo(function New(props) {
  const { TabPane } = Tabs;

  const [tabIndex, setTabIndex] = useState('1');

  const callback = (key) => {
    setTabIndex(key)
  }


  let [data2, setData2] = useState([
    {
      title: 'ASINMASTER',
      index: 0,
      isRead: false
    }
  ]);

  const [flag, setFlag] = useState(false);

  const isRead = (val) => {

      setData2(data2.map((item, key) => key === val.index ? Object.assign(val, { isRead: true }) : item));

  }

  const dropdown = () =>
  (<div className={style.newList}>
    <Tabs defaultActiveKey="1" onChange={callback} centered animated tabPosition='top'>
      <TabPane tab={`消息(${data2.filter(item => !item.isRead).length})`} key="2">
        <List
          itemLayout="horizontal"
          dataSource={data2}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<SvgIcon iconClass='logon' fontSize='25px' />}
                title={<a href="">{item.title}</a>}
                description="亚马逊平台服务正式1.0版本上线了"
              />
              <Button type="primary" size='small' ghost onClick={() => isRead(item)} disabled={item.isRead}>
                未读
                            </Button>
            </List.Item>
          )}
        />
      </TabPane>
    </Tabs>
  </div>);

  return (
    <>
      <Dropdown overlay={dropdown} placement="topLeft"
        trigger={['click']} visible={flag} onVisibleChange={(val) => setFlag(val)}>
        <div style={{ cursor: 'pointer' }}>
          <Badge count={data2.filter(item => !item.isRead).length} size="small">
            <BellOutlined className={style.icon} style={{ padding: '0px' }} />
          </Badge>
        </div>
      </Dropdown>
    </>
  )
})

export default New;
