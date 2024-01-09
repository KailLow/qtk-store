import useSWR from "swr";

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
	});

	return res;
}

export default function usePublicRoute(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body: any
) {
	const { data, error, isLoading } = useSWR(url, () =>
		publicFetcher(url, method, body)
	);

	return { data, error, isLoading };
}