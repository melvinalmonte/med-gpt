import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from 'openai';
import { SECRET_OPENAI_API_TOKEN } from '$env/static/private';

export const GET = (async (event) => {
	// log all headers
	const configuration = new Configuration({
		apiKey: SECRET_OPENAI_API_TOKEN
	});

	const openai = new OpenAIApi(configuration);

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'Your name is Dr. Watson. You are a robot specialized in the medical science of cardiology, you are named after Sherlock Holmes sidekick. You are talking to a student doctor'
			},
			{ role: 'user', content: 'Hi, who are you and what can you do' }
		],
		stream: false
	});

	const data = response.data;

	return new Response(JSON.stringify(data.choices), { status: 200 });
}) satisfies RequestHandler;
