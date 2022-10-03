const pageRoutes=[
    {
		path: '/index',
		component: () =>
			import(/* webpackChunkName: "index" */ '@/views/pages/index'),
		meta: {
			title: '首页',
			accessId: '10000',
		},
	},
]
export default pageRoutes