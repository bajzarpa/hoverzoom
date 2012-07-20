function onConnect(port) {
	port.onMessage.addListener(function(message) {
		switch(message.action) {
			case 'getOptions':
				port.postMessage({action: 'setOptions', data: main.options});
				break;
		}
	});
}

chrome.extension.onConnect.addListener(onConnect);