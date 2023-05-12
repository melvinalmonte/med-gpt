import type { PageLoad } from './$types';
type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
export const load = (async () => {
	const req = await fetch('https://jsonplaceholder.typicode.com/posts/1');
	const data = await req.json();
	if (!req.ok) throw new Error(data.message);
	return data as Post;
}) satisfies PageLoad;
