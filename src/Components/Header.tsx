import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { darkMode } from '../recoil';

const Container = styled.div`
	max-width: 480px;
	margin: 0 auto;
	padding: 5px 0;
	justify-content: space-between;
	display: flex;
	width: 100%;
	height: 5vh;
	border-bottom: 1px solid ${(props) => props.theme.accentColor};
`;

const Button = styled.button`
	background: none;
	border: none;
	border-radius: 15px;
	color: ${(props) => props.theme.textColor};
	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.accentColor};
		opacity: 0.5;
	}
`;

function Header() {
	const navigate = useNavigate();
	const darkmode = useRecoilValue(darkMode);
	const setDarkMode = useSetRecoilState(darkMode);
	return (
		<Container>
			<Button type="button" onClick={() => navigate('/')}>
				홈으로
			</Button>
			<Button type="button" onClick={() => setDarkMode((cur: boolean) => !cur)}>
				{darkmode ? 'LightMode' : 'DarkMode'}
			</Button>
		</Container>
	);
}

export default Header;
