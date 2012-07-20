var port = chrome.extension.connect();

function portOnMessage(message) {
	switch(message.action) {
		case 'setOptions':
			onSetOptions(message.data);
			break;
	}
}
port.onMessage.addListener(portOnMessage);

function postMessageToMain(message) {
	port.postMessage(message);
};


