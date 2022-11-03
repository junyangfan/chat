import { useEffect, useRef } from 'react'

// 倒计时方法
export const useInterval = (callback: () => void, delay: number) => {
	const _callback = useRef<() => void>()

	useEffect(() => {
		_callback.current = callback
	})

	useEffect(() => {
		function clock() {
			_callback.current && _callback.current()
		}
		if (delay !== null) {
			const timer = setInterval(clock, delay)
			return () => clearInterval(timer)
		}
	}, [delay])
}
