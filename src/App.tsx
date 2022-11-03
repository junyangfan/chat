import './App.css'
import Router from '@/router'
import AuthRouter from '@/components/AuthRouter'
import BasicLayout from '@/layouts/BasicLayout'

function App() {
	return (
		<BasicLayout>
			<AuthRouter>
				<Router />
			</AuthRouter>
		</BasicLayout>
	)
}

export default App
