var options;
function onSetOptions(data) {
	options = data;
	console.log(options);	
}
postMessageToMain({action: 'getOptions'});
