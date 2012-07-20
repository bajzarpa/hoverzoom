function postMessageToMain(message) {
	self.port.emit(message.action, message.data);
};

self.port.on('setOptions', function(data){
	onSetOptions(data);
});

