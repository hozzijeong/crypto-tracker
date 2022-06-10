export async function getData(url: string): Promise<any> {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}
