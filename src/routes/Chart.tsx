import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { fetchCoinHistory } from '../api/api';
import { darkMode } from '../recoil';

interface ChartProps {
	coinId: string;
}

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart() {
	const { coinId } = useOutletContext<ChartProps>();
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
	const darkmode = useRecoilValue(darkMode);

	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							data: [
								[1538856000000, [6593.34, 6600, 6582.63, 6600]],
								[1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]],
							],
						},
					]}
					options={{
						theme: {
							mode: darkmode ? 'dark' : 'light',
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
						},
						grid: { show: false },
						stroke: {
							curve: 'smooth',
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: 'datetime',
							categories: data?.map((price) => price.time_close),
						},

						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
