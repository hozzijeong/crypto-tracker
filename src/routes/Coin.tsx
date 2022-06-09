import { useParams } from 'react-router-dom';
// import styled from 'styled-components';

type RouteParams = {
	coinId: string;
};

function Coin() {
	const { coinId } = useParams<RouteParams>();

	return <h1>{coinId}</h1>;
}
export default Coin;
