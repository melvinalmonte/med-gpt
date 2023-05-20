<script>
	let messages = [
		{
			sender: 'Dr. Watson',
			content: "I'm a medical AI language model trained in cardiology. How can I assist you today?"
		}
	];
	let newMessage,
		content = '';

	const handleMessageSubmit = async () => {
		if (newMessage.trim() !== '') {
			content = newMessage;
			messages = [...messages, { sender: 'Me', content: newMessage }];
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

<div class="container mx-auto h-screen flex flex-col p-4 rounded-lg border">
	<div class="overflow-y-auto flex-grow" bind:this={messageContainer}>
		{#each messages as message}
			<div
				class="p-4 rounded-lg shadow mt-4 {message.sender === 'Me' ? 'bg-gray-200' : 'bg-blue-400'}"
			>
				<div class="ml-4 mr-4">
					<p class=" font-bold {message.sender === 'Me' ? 'text-gray-700' : 'text-black'}">
						{message.sender}
					</p>
					<p class={message.sender === 'Me' ? 'text-gray-600' : 'text-black'}>{message.content}</p>
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
