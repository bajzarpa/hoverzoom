
function handleMessage(msgEvent) {
	switch(msgEvent.name) {
		case 'getOptions':
			msgEvent.target.page.dispatchMessage('setOptions', main.options);
			break;
	}
}
safari.application.addEventListener('message', handleMessage, false);