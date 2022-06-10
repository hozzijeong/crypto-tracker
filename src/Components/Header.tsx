import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { darkMode } from '../recoil';

const Container = styled.div`
display: block: ;
	width: 100%;
  height: 5vh;
	border-bottom: 1px solid ${(props) => props.theme.accentColor};
`;

function Header() {
	const navigate = useNavigate();
	const setDarkMode = useSetRecoilState(darkMode);
	return (
		<Container>
			<button type="button" onClick={() => navigate('/')}>
				홈으로
			</button>
			<button type="button" onClick={() => setDarkMode((cur: boolean) => !cur)}>
				다크모드
			</button>
		</Container>
	);
}

export default Header;
