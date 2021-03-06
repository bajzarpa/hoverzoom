// Copyright (c) 2010 Romain Vallet
// Licensed under the MIT license, read license.txt

var hoverZoomPlugins = hoverZoomPlugins || [];
hoverZoomPlugins.push( {
	name: 'Default',
	version: '0.4',
	prepareImgLinks: function(callback) {
		var res = [];
		$('a[href]').filter(function() {
			return this.href.match(/^\w*(:\/\/)?[^\?:]*\.(jpg|jpeg|gif|png|svg|bmp|ico|xbm)(#.*)?$/i);
		}).each(function() {
			var _this = $(this);
			if (!_this.data('hoverZoomSrc')) {
				_this.data('hoverZoomSrc', [this.href]);
				res.push(_this);
			}
		});
		callback($(res));	
	}
});