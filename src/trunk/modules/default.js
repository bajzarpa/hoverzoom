// Copyright (c) 2012 Romain Vallet <romain.vallet@gmail.com>
// Licensed under the MIT license, read license.txt

modules.push( {
	name: 'Default',
	version: '1.0',
	matches: ['*'],
	getLinks: function() {
		var links = [],
			reSearch = /\/[^:]+\.(?:jpe?g|gif|png|svg|webp|bmp|ico|xbm)(?:[\?#].*)?$/i;
		document.getElementsByTagName('a').forEach(function(a) {
			if ((typeof a.href === 'string') && a.href.match(reSearch)) {
				links.push({element: a, imageUrls: [a.href]});
			}
		});
		return links;
	}
});