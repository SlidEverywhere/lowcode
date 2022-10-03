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
	{
		path: '/store',
		component: () =>
			import(/* webpackChunkName: "index" */ '@/views/pages/storePage/index'),
		meta: {
			title: '我的仓库',
			accessId: '10000',
		},
	},
]
export default pageRoutes