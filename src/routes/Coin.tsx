/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { getData } from '../utility/data';

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface RouteParams {
	coinId: string;
}

interface LocationParams {
	state: {
		name: string;
		rank?: number;
	};
}

// interface CoinInfo {

// }

function Coin() {
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<keyof RouteParams>() as RouteParams;
	const { state } = useLocation() as LocationParams;
	const [price, setPrice] = useState({});
	const [info, setInfo] = useState({});
	useEffect(() => {
		getData(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			.then((res) => setInfo(res))
			.catch((e) => alert(e));
		getData(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			.then((res) => setPrice(res))
			.catch((e) => alert(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Header>
				<Title>{state?.name || 'Loading...'}</Title>
			</Header>
			{loading ? <Loader>Loading...</Loader> : null}
		</Container>
	);
}
export default Coin;
