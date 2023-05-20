<script>
	let messages = [
		{ sender: 'Dr. Juan Watson', content: "I'm an medical AI language model. How can I assist you today?" }
	];
	let newMessage,
		content = '';

	const handleMessageSubmit = async () => {
		if (newMessage.trim() !== '') {
			content = newMessage;
			messages = [...messages, { sender: 'User', content: newMessage }];
			newMessage = '';
		}
		const req = await fetch('/api/gpt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message: content })
		});
		const res = await req.json();
		messages = [...messages, { sender: 'Dr. Juan Watson', content: res[0].message.content }];
	};

	let messageContainer;
</script>

<div class="container mx-auto h-screen flex flex-col p-4">
	<div class="overflow-y-auto flex-grow" bind:this={messageContainer}>
		{#each messages as message}
			<div
				class="bg-gray-200 p-4 rounded-lg shadow mt-4 {message.sender === 'User'
					? 'flex-row-reverse'
					: ''}"
			>
				<div class="flex">
					<div class="ml-4">
						<p class="text-gray-700 font-bold">{message.sender}</p>
						<p class="text-gray-600">{message.content}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="sticky bottom-0 bg-gray-200 p-4 rounded-lg shadow">
		<form on:submit|preventDefault={handleMessageSubmit} class="flex">
			<input
				type="text"
				class="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				placeholder="Type your message..."
				bind:value={newMessage}
			/>
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg"
			>
				Send
			</button>
		</form>
	</div>
</div>
