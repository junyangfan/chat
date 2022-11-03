import less from './index.module.less'
import classNames from 'classnames/bind'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const css = classNames.bind(less)
import { Button, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { storeReducer } from '@/utils'
import { useDispatch } from 'react-redux'
import { resetGlobal } from '@/store/reducer/globalReducer'
import request from '@/api/request'

const { Search } = Input

const HomeEle = () => {
	const navigate = useNavigate()
	const { token } = storeReducer('globalReducer')
	const onSearch = (value: string) => console.log(value)
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const getReqApi = async () => {
		try {
			const res = await request.get('test?delay=1&count=1', {})
			console.log(res);
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h1>{t('home.title')}</h1>
			<div>{`token${token}`}</div>
			<div>
				<Button
					type="primary"
					onClick={() => {
						dispatch(resetGlobal())
					}}>
          按钮
				</Button>
			</div>
			<Button
				type="primary"
				onClick={getReqApi}>
				发起请求
			</Button>
			<div>
				<Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
			</div>
			<Button onClick={() => navigate('/login')}>跳转Login（无需登录）</Button>
			<Button onClick={() => navigate('/mine')}>跳转Mine（需要登录，没登录重定向到Login）</Button>
		</div>
	)
}
export default HomeEle
