import { lazy, Suspense } from 'react'
import Loading from '@/components/Loading'

const LazyLoadEle = (path: string) => {
	const Component = lazy(() => import(`../../pages/${path}/index.tsx`))

	return (
		<Suspense fallback={<Loading />}>
			<Component></Component>
		</Suspense>
	)
}

export default LazyLoadEle
