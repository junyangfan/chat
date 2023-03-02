import { useTranslation } from 'react-i18next'
import Animation from '@/components/Animation'
import LoginBgJSON from '@/assets/lottie/login-bg.json'
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
import { useNavigate } from 'react-router-dom'

interface UserInfo {
	username: string
	password: string
}

const LoginEle = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [checked, setChecked] = useState<boolean>(false)
	const [loginLoading, setLoginLoading] = useState<boolean>(false)

	// 登录
	const onFinish = async (values: UserInfo) => {
		try {
			if (!checked) {
				message.warning(t('argument.msg'))
				return
			}
			const { username, password } = values
			if (username !== 'admin' || password !== '123456') {
				message.error(`${t('login.register.username.phr')}: admin, ${t('login.register.password.phr')}: 123456`)
				return
			}
			setLoginLoading(true)
			dispatch(setToken(values.username))
			setLoginLoading(false)

			message.success('登录成功')
			navigate('/')
		} catch (error) {
			console.log(error)
		}
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
			<Animation className={css(['svg'])} JSONFile={LoginBgJSON}></Animation>
			<div className={css(['box_card', 'box_login_card'])}>
				<Form name="login" className="login-form" onFinish={onFinish}>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: `${t('login.register.username.msg')}`,
							},
						]}>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder={t('login.register.username.phr')}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: `${t('login.register.password.msg')}`,
							},
						]}>
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
						<Button
							type="primary"
							loading={loginLoading}
							htmlType="submit"
							className="login-form-button">
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
		</div>
	)
}

export default LoginEle
