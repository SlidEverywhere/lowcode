import { Card } from './index'
import Image from '@/assets/1.jpg'
function TestCard() {
	return (
		<>
			<Card
				onClick={() => {
					console.log(1)
				}}
				image={Image}
				title='1231'
				content='asdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
			/>
		</>
	)
}

export default TestCard
