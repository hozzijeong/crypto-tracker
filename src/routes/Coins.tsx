import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.h1``;

const CoinList = styled.ul``;

const Coin = styled.li``;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}
function Coins() {
	const [coins, setCoins] = useState<CoinInterface[]>([]);

	const getData = async (url: string): Promise<any> => {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	};

	useEffect(() => {
		getData('https://api.coinpaprika.com/v1/coins')
			.then((res) => setCoins([...res].slice(0, 100)))
			.catch((e) => {
				if (e === 'rejected') alert('거부되었습니다.');
			});
	}, []);

	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			<CoinList>
				{coins.map((coin) => (
					<Coin key={coin.id}>
						{coin.rank}. {coin.name}
					</Coin>
				))}
			</CoinList>
		</Container>
	);
}
export default Coins;
