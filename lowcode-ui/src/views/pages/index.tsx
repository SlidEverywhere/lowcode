import styles from './index.module.less'
import { Card } from '@lowcode/components'
import Image from '@/assets/images/Page/test.png'
const cardList = [
	{
		title: (
			<>
				<span className={styles.cardTitle}>创建幻灯片</span>
			</>
		),
		content: '拖拽快捷生成幻灯片ppt,并且在线实时展示。',
		image: Image,
		onclick: () => {
			console.log(1)
		},
	},
	{
		title: (
			<>
				<span className={styles.cardTitle}>敬请期待</span>
			</>
		),
		content: '后期将组件开放新功能，作者正在努力加更中。。。',
		image: Image,
		onclick: () => {
			console.log('敬请期待' + 2)
		},
	},
]
function Index() {
	// 新建
	// 最近打开
	return (
		<div className={styles.pageIndex}>
			<main>
				<div className={styles.title}>
					<h1>欢迎使用免费的在线编辑平台</h1>
					<p>专业强大的作图工具，可用于快捷搭建PPT,简历，和文章。</p>
				</div>
				<h3>新建项目</h3>
				<div className={styles.createExample}>
					{cardList.map((item, index) => {
						return (
							<Card
								clasName={styles.card}
								key={index}
								onClick={item.onclick}
								image={item.image}
								title={item.title}
								content={item.content}
							/>
						)
					})}
				</div>
			</main>
		</div>
	)
}

export default Index
