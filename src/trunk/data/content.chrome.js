var port = chrome.extension.connect();
port.onMessage.addListener(portOnMessage);

function portOnMessage(message) {
	switch(message.action) {
		case 'setOptions':
			onSetOptions(message.data);
			break;
		case 'setModulesPerHost':
			onSetModulesPerHost(message.data);
			break;
	}
}

function postMessageToMain(message) {
	port.postMessage(message);
};


