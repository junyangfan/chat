import { LangConfig, StatusEnum, ILang } from '@/enum'
import { useTranslation } from 'react-i18next'
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'
import { Select, Switch, Space } from 'antd'
import { getLocalLang } from '@/utils'
import less from './index.module.less'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
const css = classNames.bind(less)
import Icon from '@/components/Icon'

const { Option } = Select

const BasicLayoutEle = (props: { children: JSX.Element }) => {
	const { i18n } = useTranslation()

	// 语言控制
	const lang = getLocalLang()

	// 暗黑模式控制
	const [theme, setTheme] = useState(true)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [initLoading, setInitLoading] = useState<boolean>(true)

	const onChangeLanguage = (lang: ILang) => {
		i18n.changeLanguage(lang)
		setTheme(theme)
	}

	const switchTheme = () => {
		if (theme) {
			setTheme(false)
			toggleTheme({ scopeName: 'theme-dark' })
			return
		}
		setTheme(true)
		toggleTheme({ scopeName: 'theme-light' })
	}

	useEffect(() => {
		const onHandleDOMLoad = () => {
			setInitLoading(false)
			console.log('load')
		}
		window.addEventListener('load', onHandleDOMLoad)
		return () => window.removeEventListener('load', onHandleDOMLoad)
	}, [])

	return (
		<div className={css(['basic_layout'])}>
			<main>{props.children}</main>
			<footer>
				<Space>
					<Select defaultValue={lang as ILang} style={{ width: 100 }} onChange={onChangeLanguage}>
						{LangConfig.map((i: StatusEnum) => (
							<Option key={i.value} value={i.value}>
								{i.label}
							</Option>
						))}
					</Select>
					<Switch
						defaultChecked
						checkedChildren={<Icon type="icon-taiyang"></Icon>}
						unCheckedChildren={<Icon type="icon-yueliang"></Icon>}
						onChange={switchTheme}
					/>
				</Space>
			</footer>
		</div>
	)
}

export default BasicLayoutEle
