import { useTranslation } from 'react-i18next'

const MineEle = () => {
	const { t } = useTranslation()

	return (
		<>
			<div>{t('mine.title')}</div>
		</>
	)
}

export default MineEle
