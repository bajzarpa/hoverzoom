var options,
	modules,
	links,
	hzFigure,
	hzFigureCss;
	
function init() {

	hzFigureCss = 'border: 1px solid #e3e3e3; line-height: 0; overflow: hidden; padding: 2px; margin: 0; position: absolute; z-index: 2147483647; border-radius: 3px; background: -webkit-gradient(linear, left top, right bottom, from(#ffffff), to(#ededed), color-stop(0.5, #ffffff)); -webkit-box-shadow: 3px 3px 6px rgba(0,0,0,0.46)';

	prepareLinks();
}

function prepareLinks() {
	links = [];
	for (var i = 0; i < modules.length; i++) {
		links = links.concat(modules[i].getLinks());
	}
	for (var i = 0; i < links.length; i++) {
		links[i].element.addEventListener('mousemove', linkOnMouseMove)
	}
}

function linkOnMouseMove() {
	showFigure();
}

function showFigure() {
	createFigure();
	
}

function createFigure() {
	if (typeof hzFigure === 'undefined') {
		hzFigure = document.createElement('figure');
		hzFigure.id = 'hzFigure';
	}
	hzFigure.style.cssText = hzFigureCss;
	while (hzFigure.firstChild) {
	  hzFigure.removeChild(hzFigure.firstChild);
	}
}
	
function onSetOptions(data) {
	options = data;
	postMessageToMain({action: 'getModulesPerHost', data: location.host});
}

function onSetModulesPerHost(data) {
	modules = data;
	init();
}

postMessageToMain({action: 'getOptions'});
