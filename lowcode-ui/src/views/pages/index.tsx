import styles from './index.module.less'
import { Card } from '@lowcode/components'
import Image from '@/assets/images/Page/test.png'
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
				<div className='create-example'>
					<Card
						onClick={() => {
							console.log(1)
						}}
						image={Image}
						title='1231'
						content='asdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
					/>
				</div>
			</main>
		</div>
	)
}

export default Index
