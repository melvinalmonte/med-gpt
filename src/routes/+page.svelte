<script lang="ts">
	import { useChat } from 'ai/svelte';
	import {afterUpdate} from "svelte";

	const { messages, handleSubmit, input } = useChat({
		api: '/chat'
	});

	let element;
	const scrollToBottom = async (node) => {
		node.scroll({
			top: node.scrollHeight,
			behavior: "smooth"
		})
	}

	afterUpdate(() => {
		if(messages) scrollToBottom(element)
	})

	if(messages && element){
		scrollToBottom(element)
	}

</script>
<svelte:head>
	<title>Dr. Juan Watson</title>
</svelte:head>
<div class="container mx-auto flex flex-col p-4 rounded-lg h-full">
	<div class="navbar ">
		<div class="normal-case text-xl">Juan Watson, MD.</div>
	</div>
	<div class="overflow-y-auto flex-grow" bind:this={element}>
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
	<form class="join " on:submit={handleSubmit}>
		<textarea
			class="input w-full textarea textarea-primary join-item"
			bind:value={$input}
			placeholder="Ask me a medical related question"></textarea>
		<button class="btn btn-outline btn-primary join-item" type="submit">Send</button>
	</form>
</div>
