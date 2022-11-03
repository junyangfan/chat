import { Modal, Button } from 'antd'
import { useState } from 'react'
import less from './index.module.less'
import classNames from 'classnames/bind'
const css = classNames.bind(less)
import { useTranslation } from 'react-i18next'
import { useInterval } from '@/utils/hooks'

interface IProps {
  linkText: string
  isAgreeBtn?: boolean
  isAgree?: boolean
  callback: (status: boolean) => any
}

const initCount = 5

const AgreementEle = (props: IProps) => {
	const { linkText, callback, isAgree } = props
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)

	const onCount = isAgree ? 0 : initCount

	const [count, setCount] = useState(onCount)

	const hideModal = () => {
		setOpen(false)
		callback(false)
	}

	useInterval(() => {
		if (count > 0) {
			setCount(count - 1)
		}
	}, 1000)

	const consentAgreement = () => {
		setOpen(false)
		callback(true)
	}

	// 初始化
	const initialData = () => {
		setOpen(true)
		setCount(onCount)
	}
	return (
		<>
			<a href="#" onClick={initialData}>
				{linkText}
			</a>
			<Modal
				title={[
					<div key="title" className={css(['modal_title'])}>
						{t('argument.title')}
					</div>,
				]}
				keyboard={false}
				maskClosable={false}
				destroyOnClose
				centered
				footer={null}
				open={open}
				onCancel={hideModal}>
				<div className={css(['agreement_content'])}>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
					<p>Bala Bala Bala...</p>
				</div>
				<div className={css(['modal_btn'])}>
					<Button disabled={count > 0} type="primary" shape="round" onClick={consentAgreement}>
						{count > 0 && count} {t('argument.ok')}
					</Button>
				</div>
			</Modal>
		</>
	)
}

export default AgreementEle
