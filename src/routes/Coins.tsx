/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getData } from '../api/api';

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
	background-color: ${(props) => props.theme.reverseBgColor};
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
	const getImageSrc = (symbol: string): string => `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`;
	const URL = 'https://api.coinpaprika.com/v1/coins';
	const { isLoading, data, isSuccess } = useQuery<CoinInterface[]>(['allCoins', URL], () => getData(URL));

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>COINS</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : isSuccess ? (
				<CoinList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<Image src={getImageSrc(coin.symbol)} />
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			) : null}
		</Container>
	);
}
export default Coins;
