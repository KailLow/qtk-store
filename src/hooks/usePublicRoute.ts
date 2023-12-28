export async function publicFetcher(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: any
) {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(body),
	}).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); ;

	return res;
}