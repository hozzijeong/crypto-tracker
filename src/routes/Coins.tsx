import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getData } from '../utility/data';

const Container = styled.div`
	padding: 0 20;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	border-radius: 15px;
	margin-bottom: 10px;
	color: ${(props) => props.theme.bgColor};
	a {
		padding: 20px;
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
		opacity: 0.95;
	}
`;

const Image = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 10px;
`;

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
	const [loading, setLoading] = useState(true);

	const getImageSrc = (symbol: string): string => `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`;

	useEffect(() => {
		getData('https://api.coinpaprika.com/v1/coins')
			.then((res) => {
				setCoins([...res].slice(0, 100));
				setLoading(false);
			})
			.catch((e) => {
				if (e === 'rejected') alert('거부되었습니다.');
			});
	}, []);

	return (
		<Container>
			<Header>
				<Title>COINS</Title>
			</Header>
			{loading ? (
				<Loader>Loading</Loader>
			) : (
				<CoinList>
					{coins.map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<Image src={getImageSrc(coin.symbol)} />
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}
export default Coins;
