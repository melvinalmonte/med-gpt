<script lang="ts">
	import { useChat } from 'ai/svelte';

	const { messages, handleSubmit, input } = useChat({
		api: '/chat'
	});
</script>

<div class="container mx-auto flex flex-col p-4 rounded-lg h-full w-full">
	<div class="navbar bg-base-100">
		<div class="normal-case text-xl">Juan Watson, MD.</div>
	</div>
	<div class="overflow-y-auto flex-grow">
		{#each $messages as message}
			<div class="chat {message.role === 'assistant' ? 'chat-start' : 'chat-end'}">
				<div
					class="chat-bubble {message.role === 'assistant'
						? 'chat-bubble-primary'
						: 'chat-bubble-secondary'}"
				>
					{message.content}
				</div>
			</div>
		{/each}
	</div>
	<form class="join w-full p-4" on:submit={handleSubmit}>
		<textarea
			class="input w-full textarea textarea-primary join-item"
			bind:value={$input}
			placeholder="Ask me a medical related question"></textarea>
		<button class="btn btn-outline btn-primary join-item" type="submit">Send</button>
	</form>
</div>
