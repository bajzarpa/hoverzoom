function handleMessage(msgEvent) {
	switch(msgEvent.name) {
		case 'setOptions':
			onSetOptions(msgEvent.message);
			break;
	}
}
safari.self.addEventListener('message', handleMessage, false);

function postMessageToMain(message) {
	safari.self.tab.dispatchMessage(message.action, message.data);
}