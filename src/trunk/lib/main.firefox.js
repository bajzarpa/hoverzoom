const self = require("self");
const pageMod = require("page-mod");

function postMessage(message, worker) {
	worker.port.emit(message.action, message.data);
}

pageMod.PageMod({
	include: '*',
	contentScriptWhen: 'ready',
	contentScriptFile: [
		self.data.url('content.firefox.js'),
		self.data.url('content.js')
	],
	onAttach: function onAttach(worker) {
		worker.port.on('getOptions', function(data) {
			onGetOptions(worker);
		});
		worker.port.on('getModulesPerHost', function(data) {
			onGetModulesPerHost(data, worker);
		});
	}
});

init();