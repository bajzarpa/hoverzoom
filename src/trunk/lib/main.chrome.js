
function postMessage(message, context) {
	context.postMessage(message);
}

function onConnect(port) {
	port.onMessage.addListener(function(message) {
		switch(message.action) {
			case 'getOptions':
				onGetOptions(port);
				break;
			case 'getModulesPerHost':
				onGetModulesPerHost(message.data, port);
				break;
		}
	});
}

chrome.extension.onConnect.addListener(onConnect);
document.addEventListener('DOMContentLoaded', init, false);
