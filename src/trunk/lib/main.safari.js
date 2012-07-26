
function postMessage(message, msgEvent) {
	msgEvent.target.page.dispatchMessage(message.action, message.data);
}

function handleMessage(msgEvent) {
	switch(msgEvent.name) {
		case 'getOptions':
			onGetOptions(msgEvent);
			break;
		case 'getModulesPerHost':
			onGetModulesPerHost(msgEvent.message, msgEvent);
			break;
	}
}
safari.application.addEventListener('message', handleMessage, false);