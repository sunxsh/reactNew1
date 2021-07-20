import React from 'react'
import { Form, Button, Input } from 'antd';
import { useHistory } from "react-router-dom";
import { requestCode } from '@/utils/varbile'
import { useSelector,useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './login.module.scss'
import logon from '@/assets/image/logo_l.svg'
import md5 from 'blueimp-md5'
import { localStorage } from '@/assets/js/storage'

const Login = () => {

  const history = useHistory();

  const dispatch = useDispatch();

  const loading = useSelector(({ other }) => other.loading);

  const onFinish = async (values) => {


  };

  return (
    <div className={style.login}>
      <div className={style.main}>
        <div className={style.leftContent}>
          <div className={style.introduct}>
            <img src={logon} alt="logon" />
            <section>
              <p>精细运营，优化成本</p>
              <p>提升效率，把控利润</p>
            </section>
          </div>
        </div>
        <div className={style.rightContent}>
          <div className={style.rightContentbox}>
            <div className={style.slogan}>
              <p>Hello,</p>
              <p>Welcome back!</p>
              <p>Login your account</p>
            </div>
            <div className={style.from}>
              <Form name="basic" initialValues={{ remember: true }} layout='vertical' onFinish={onFinish} className={style.fromContent}>
                <Form.Item name="email" validateTrigger='onBlur' className='loginInput'
                  rules={[{ required: true, message: '请填写账号' }, () => ({
                    validator(rule, value) {
                      if (!!value && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g.test(value)) {
                        return Promise.reject('请填写正确的邮箱');
                      }
                      return Promise.resolve();
                    },
                  })]} label={
                    <>
                      <UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                      <span className={style.label}>账号</span>
                    </>
                  }>
                  <Input
                    placeholder="请填写邮箱"
                    size='large'
                    allowClear
                    className='loginInput'
                  />
                </Form.Item>
                <Form.Item name="password" validateTrigger='onBlur' className='loginInput'
                  rules={[{ required: true, message: '请填写密码' }, () => ({
                    validator(rule, value) {
                      if (!!value && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/g.test(value)) {
                        return Promise.reject('至少6位数，数字+字母');
                      }
                      return Promise.resolve();
                    },
                  })]} label={
                    <>
                      <LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                      <span className={style.label}>密码</span>
                    </>
                  }>
                  <Input
                    type="password"
                    placeholder="请填写密码"
                    size='large'
                    allowClear
                    className='loginInput'
                    id={style.loginInput}
                  />
                </Form.Item>
                <Form.Item className={style.space}>
                  <Button type="primary" htmlType="submit"
                    loading={loading}
                    className={style.submit}
                    size='large'
                  >
                    登录
              </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

