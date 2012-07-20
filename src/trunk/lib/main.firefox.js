const self = require("self");
const pageMod = require("page-mod");
const main = require("main").main;

pageMod.PageMod({
	include: '*',
	contentScriptWhen: 'ready',
	contentScriptFile: [
		self.data.url('content.firefox.js'),
		self.data.url('content.js')
	],
	onAttach: function onAttach(worker) {
		worker.port.on('getOptions', function(data) {
			worker.port.emit('setOptions', main.options);
		});
	}
});
