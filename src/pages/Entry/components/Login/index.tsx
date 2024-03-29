import { useTranslation } from 'react-i18next'
import less from './index.module.less'
import classNames from 'classnames/bind'
const css = classNames.bind(less)
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Input, Form, Checkbox, Button, message } from 'antd'
import Agreement from '@/components/Agreement'
import { useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { setToken } from '@/store/reducer/globalReducer'
import { useDispatch } from 'react-redux'

interface UserInfo {
  username: string
  password: string
}

const LoginEle = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [checked, setChecked] = useState<boolean>(false)

	// 登录
	const onFinish = (values: UserInfo) => {
		if (!checked) {
			message.warning(t('argument.msg'))
			return
		}

		dispatch(setToken(values.username))

		console.log(values)
		message.info('功能开发中')
	}

	// 注册
	const onHandleRegister = () => {
		message.info('功能开发中')
	}

	// 同意协议
	const agreeProtocol = (status: boolean) => {
		if (!checked) {
			setChecked(status)
		}
	}

	// 是否同意隐私协议
	const onChangeChecked = (e: CheckboxChangeEvent) => {
		setChecked(e.target.checked)
	}

	// 忘记密码
	const onHandleForget = () => {
		message.info('功能开发中')
	}

	return (
		<div className={css(['login_box'])}>
			<Form name="login" className="login-form" onFinish={onFinish}>
				<Form.Item name="username" rules={[{ required: true, message: `${t('login.register.username.msg')}` }]}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder={t('login.register.username.phr')}
					/>
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: `${t('login.register.password.msg')}` }]}>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder={t('login.register.password.phr')}
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item valuePropName="checked" noStyle>
						<Checkbox checked={checked} onChange={onChangeChecked}>
							{t('login.register.agreement.left')}
							<Agreement
								isAgree={checked}
								linkText={t('login.register.agreement.right')}
								callback={agreeProtocol}></Agreement>
						</Checkbox>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						{t('login.register.login.in')}
					</Button>
				</Form.Item>
			</Form>
			<div className={css(['extra_opera'])}>
				<a href="#" onClick={onHandleForget}>
					{t('login.register.extra.forget')}
				</a>
				<a href="#" onClick={onHandleRegister}>
					{t('login.register.extra.register')}
				</a>
			</div>
		</div>
	)
}

export default LoginEle
