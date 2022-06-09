import { useParams } from 'react-router-dom';
// import styled from 'styled-components';

type RouteParams = {
	coinId: string;
};

function Coin() {
	const { coinId } = useParams<RouteParams>();
	console.log(coinId);
	return <h1>{coinId}</h1>;
}
export default Coin;
