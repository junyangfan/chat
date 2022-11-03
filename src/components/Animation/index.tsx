import Lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

interface IProps {
  tip?: string
  JSONFile: any
  className?: string
}

const AnimationEle = (props: IProps) => {
	const { tip, JSONFile, className } = props
	const AnimationBox = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		Lottie.loadAnimation({
			container: AnimationBox.current as HTMLDivElement,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: JSONFile,
		})

		return () => Lottie.destroy()
	}, [])

	return (
		<div className={className}>
			<div ref={AnimationBox}></div>
			<div>{tip ?? ''}</div>
		</div>
	)
}

export default AnimationEle
