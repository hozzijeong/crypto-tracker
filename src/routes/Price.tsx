import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { PriceData, IUSD } from './Coin';
import { darkMode } from '../recoil';

function Price() {
	const { data } = useQuery<PriceData>('coinPriceInfo');
	const percentValues: number[] = [];
	const percentKeys: string[] = [];
	const darkmode = useRecoilValue(darkMode);

	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of Object.entries(data?.quotes.USD as IUSD)) {
		if (key.includes('percent_change')) {
			percentValues.push(value);
			percentKeys.push(key.split('_')[2]);
		}
	}
	return (
		<ApexChart
			type="line"
			series={[{ name: data?.name, data: percentValues }]}
			options={{
				theme: {
					mode: 'dark',
				},
				chart: {
					height: 300,
					width: 500,
					toolbar: {
						show: false,
					},
					background: 'transparent',
				},
				grid: { show: false },
				stroke: {
					curve: 'smooth',
					width: 5,
				},
				yaxis: {
					show: false,
				},
				xaxis: {
					axisBorder: { show: false },
					axisTicks: { show: false },
					labels: { show: false },
					categories: percentKeys,
				},
				title: {
					text: `The Percent Change of ${data?.name}`,
					style: {
						fontWeight: 'bold',
						color: darkmode ? '#f5f6fa' : '#000000',
					},
				},
			}}
		/>
	);
}

export default Price;
