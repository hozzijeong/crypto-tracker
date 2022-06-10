export async function getData(url: string): Promise<any> {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

const URL = 'https://api.coinpaprika.com/v1';
export function fetchCoinHistory(coinId: string) {
	const endDate = Math.floor(Date.now() / 1000);
	const startDate = endDate - 60 * 60 * 24;

	return fetch(`${URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
		.then((res) => res.json())
		.catch((e) => console.error(e));
}
