import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type RouteParams = {
	coinId: string;
};

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
`;

function Coin() {
	const { coinId } = useParams<RouteParams>();

	return <Title>{coinId}</Title>;
}
export default Coin;
