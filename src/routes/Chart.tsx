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
							data: data?.map((x) => [
								new Date(x.close).getTime() as number,
								[x.open, x.high, x.low, x.close].map((k) => parseInt(k.toFixed(2), 10)) as number[],
							]) as any,
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
