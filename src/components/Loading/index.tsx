import less from './index.module.less'
import classNames from 'classnames/bind'
const css = classNames.bind(less)
import DefaultLoadingJSON from '@/assets/lottie/loading.json'
import Lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

interface IProps {
  tip?: string
  LoadingJSON?: any
}

const LoadingEle = (props: IProps) => {
	const { tip, LoadingJSON } = props
	const LoadBox = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		Lottie.loadAnimation({
			container: LoadBox.current as HTMLDivElement,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: LoadingJSON ?? DefaultLoadingJSON,
		})

		return () => Lottie.destroy()
	}, [])

	return (
		<div className={css(['loading_box'])}>
			<div ref={LoadBox}></div>
			<span>{tip ?? ''}</span>
		</div>
	)
}

export default LoadingEle
