import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface IOpts {
  to: string
}

const RedirectEle = ({ to }: IOpts) => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate(to, { replace: true })
	})
	return <></>
}

export default RedirectEle
