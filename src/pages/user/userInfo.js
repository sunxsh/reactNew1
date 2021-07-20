import React, { memo, useEffect, useState } from 'react'
import { Button, Form, Cascader, Checkbox } from 'antd';
import { useFormLayout } from '@/hooks'
import { useSelector, useDispatch } from 'react-redux';
import { requestCode } from '@/utils/varbile'
import { useHistory } from "react-router-dom";
import { createSelector } from 'reselect'
import Inputs from '@/components/input';
import md5 from 'blueimp-md5'
import { userAdd, userUpdate, gsuser1Info, addOrUpdateUser } from '@/api/login';
import { localStorage } from '@/assets/js/storage'
import { toast } from '@/utils/function'
import './userInfo.scss'

const UserInfo = memo(function UserInfo() {
  const [formItemLayout] = useFormLayout();

  const history = useHistory();

  const [form] = Form.useForm();

  const selectNumOfDoneTodos = createSelector(
    [(state) => state.user, (state) => state.other],
    (user, other) => [user.getUserInfo, other.loading]
  );

  const [getUserInfo, , loading] = useSelector(selectNumOfDoneTodos);

  useEffect(() => {
    const { userId } = localStorage.getItem('userInfo') || {};
    const asyncTypes = async () => {
      let res = await gsuser1Info({ userId: userId });
      if (res.code === requestCode.successCode) {
        // setSysroleData(res.data.rows)
        let { email, phonenumber, deptName, userName } = res.data;
        form.setFieldsValue({ email, phonenumber, deptName, userName });
      }
    }
    asyncTypes();
  }, []);

  const handleSubmit = () => { // 提交
    form.validateFields().then(async (values) => {
      const { userId } = localStorage.getItem('userInfo') || {};
      let fromData = Object.assign({}, values, { userId });
      if (values.password) {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/g.test(values.password)) {
          toast(requestCode.failedCode, `密码格式不对，至少6位数，数字+字母`);
          return false;
        }
        fromData = Object.assign({}, values, { password: md5(values.password), userId });
      }
      let res = await addOrUpdateUser(fromData);
      if (res.code === requestCode.successCode) {
        localStorage.clear();
        history.push(`/login?rp=${+new Date()}`);
      }
    })
  };

  return (
    <div className='bgW userInfo'>
      <Form name="basic" layout='vertical' {...formItemLayout} className='userForm' form={form}>
        <Form.Item label="账号" validateTrigger='onBlur' name='email' rules={[{ required: true, message: '请填写账号' }, () => ({
          validator(rule, value) {
            if (!!value && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g.test(value)) {
              return Promise.reject('请填写正确的邮箱');
            }
            return Promise.resolve();
          },
        })]}>
          <Inputs />
        </Form.Item>
        <Form.Item label="手机号" validateTrigger='onBlur' name='phonenumber' rules={[{ required: true, message: '请填写手机号' }, () => ({
          validator(rule, value) {
            if (!!value && !/^1\d{10}$/g.test(value)) {
              return Promise.reject('请填写正确的手机号格式');
            }
            return Promise.resolve();
          },
        })]}>
          <Inputs />
        </Form.Item>
        <Form.Item label="部门" name='deptName'>
          <Inputs disabled={true} />
        </Form.Item>
        <Form.Item label="用户名" validateTrigger='onBlur' name='userName' rules={[{ required: true, message: '请填写用户名' }]}>
          <Inputs />
        </Form.Item>
        {
          <Form.Item label="修改密码" name='password'>
            <Inputs placeholder='请输入你要更改的新密码' />
          </Form.Item>
        }
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>更改基本信息</Button>
        </Form.Item>
      </Form>
    </div>
  )
})

export default UserInfo;
