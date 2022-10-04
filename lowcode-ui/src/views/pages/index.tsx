import styles from './index.module.less'
import { Divider } from 'antd'
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
			</main>
		</div>
	)
}

export default Index
