import Animation from '@/components/Animation'
import LoginBgJSON from '@/assets/lottie/login-bg.json'
import less from './index.module.less'
import classNames from 'classnames/bind'
const css = classNames.bind(less)
import Login from './components/Login'

const EntryEle = () => {


	return (
		<div className={css(['entry_box'])}>
			<Animation className={css(['svg'])} JSONFile={LoginBgJSON}></Animation>
			<Login></Login>
		</div>
	)
}

export default EntryEle
