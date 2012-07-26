
var options = [1,2],
	modules = [],
	moduleIndex;

function init() {
	buildModuleIndex();
}

function buildModuleIndex() {
	moduleIndex = {};
	modules.forEach(function(module) {
		module.matches.forEach(function(match) {
			if (typeof(moduleIndex[match]) !== 'array')
				moduleIndex[match] = [];
			moduleIndex[match].push(module);
		});
	});
}

function getModulesPerHost(host) {
	var modulesPerHost = moduleIndex['*'];
	if (moduleIndex.hasOwnProperty(host)) {
		modulesPerHost = modulesPerHost.concat(moduleIndex[host]);
	} else {
		var l = Object.keys(moduleIndex).length;
		host = '.' + host;
		for (var i=0; i<l; i++) {
			var key = Object.keys(moduleIndex)[i];
			if (host.lastIndexOf('.' + key) == host.length - key.length - 1) {
				modulesPerHost = modulesPerHost.concat(moduleIndex[key]);
				break;
			}
		}
	}
	return modulesPerHost;
}

function onGetOptions(context) {
	postMessage({action: 'setOptions', data: options}, context);
}

function onGetModulesPerHost(host, context) {
	postMessage({action: 'setModulesPerHost', data: getModulesPerHost(host)}, context);
}