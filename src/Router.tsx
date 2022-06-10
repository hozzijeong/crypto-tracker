import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';
import Header from './Components/Header';

function Router() {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<Routes>
					<Route path="/:coinId" element={<Coin />}>
						<Route path="/chart" element={<Chart />} />
						<Route path="/price" element={<Price />} />
					</Route>
					<Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default Router;
