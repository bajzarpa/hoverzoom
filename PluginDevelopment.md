

# Introduction #

Hover Zoom has been designed to minimize the efforts to add support for new sites while keeping the code organized (well, not too messy at the least). The core functionalities are kept in the main files, while the code specific to each site is written in individual javascript files in the **plugins** subdirectory.

## Prerequisites ##

You will need a good knowledge of the following:
  * [HTML](http://www.w3.org/html/) and the [DOM](http://www.w3.org/standards/techs/dom)
  * Javascript
  * [jQuery](http://jquery.com/)
  * [Google Chrome Extension development](http://code.google.com/chrome/extensions/docs.html)

# Main tasks #

Writing a Hover Zoom plugin consists of two main tasks:
  * Writing the code that will find image links and "prepare" them. This code will be written in a new .js file in the **plugins** directory of the extension.
  * Adding an entry for your plugin in the **content\_scripts** section of the [manifest file](http://code.google.com/chrome/extensions/manifest.html).

## Writing the plugin ##

First, you will need to create a new javascript file in the **plugins** directory. If you plan to add support for **example.com**, name your file **example.js**. The file name is up to you, just make sure that it is unique and clearly identifies the supported site.

Now you can begin writing your code in that file. Here is the basic structure of a plugin:

```
var hoverZoomPlugins = hoverZoomPlugins || [];

hoverZoomPlugins.push( {
    name: 'My supported site',
    version: '0.1',
    prepareImgLinks: function(callback) {

        // Detect and prepare image links

    }
});
```

This script will be run each time a page from the supported site is loaded. What it does is adding the plugin object to the global array named **hoverZoomPlugins**. The first line of the code creates this array if it doesn't exist.

A plugin object has three members:
  * name: usually the name of the supported site.
  * version: a version number. Usually 0.1, 0.2, 0.3, etc. The version number changes each time a new version of the plugin is released with a new version of Hover Zoom.
  * prepareImgLinks: a function that detects the image links and prepare them. More details below.

### prepareImgLinks ###

This function needs to:
  * Find the image links. This is done with a jQuery selection.
  * Generate the URLs of the full size images. In the simplest cases this is done by replacing some characters in the thumbnail source URL, but this process may vary greatly depending on the site you work on.
  * Store these URLs in the image links. This is done with the **.data(key,value)** jQuery method, using "hoverZoomSrc" as the key and an array containing the URL string as the value.
  * Return the list of links as a jQuery object using the **callback** function. This function is provided as a parameter of the **prepareImgLinks** function.

**Example**

For a site where image thumbnails have this form: `<a href="product123456.html"><img class="thumb" src="/images/thumbs/123456.jpg"></a>`

and the full size image URLs have this form: `/images/full/123456.jpg`

```
prepareImgLinks: function(callback) {
    var res = [];                             // Array that will contain the list of links
    $('a img.thumb').each(function() {        // Finds all img elements who are a descendant of an a element and have the "thumb" CSS class
        var img = $(this),                    // img element
            link = img.parents('a:eq(0)'),    // a element
            src = img.attr('src');            // Thumbnail URL
        src = src.replace('thumbs', 'full');  // Generates full size image URL
        link.data('hoverZoomSrc', [src]);     // Stores the URL in the link
        res.push(link);                       // Adds the link to the list
    });
    callback($(res));                         // The array is converted into a jQuery object and sent to the callback function
}
```

This is a basic example. In reality, you should do some more checks to avoid errors. If your code looks like this, you can use the **hoverZoom.urlReplace** method to make it shorter:

```
prepareImgLinks: function(callback) {
    var res = [];
    hoverZoom.urlReplace(res, 'a img.thumb', 'thumbs', 'full');
    callback($(res));
}
```

This method does everything we described above, plus some other things and error checking. Please use it whenever you can to avoid code duplication.

### hoverZoom.urlReplace ###

Parameters:
  * **res**: array to store the links
  * **filter**: a jQuery search string used to find the image links
  * **search**: a string a regular expression to search for in the thumbnails or links URL.
  * **replace**: a string to replace what have been found in the thumbnails or links URL.
  * **parent** (optional): a jQuery search string used to find the parent of the found element that will get the _hoverZoomSrc_ data. Default value: **a:eq(0)** (first "a" parent).

Notes:
  * **filter** can contain a query to find **img** or **a** elements. Actually, anything that has a **href**, **src** or **style.backgroundImage** attribute.
  * **search** and **replace** can be arrays if you want to do several _search and replace_ operations. `search[0]` will be replaced by `replace[0]`, `search[1]` by `replace[1]`, and so on.

## Manifest file ##

Once your plugin is written, you can add its entry to the **content\_scripts** section of the extension's manifest file.

Example, if you wrote a plugin to add zooming support to **example.com**:

```
{
    "matches": ["*://*.example.com/*"],
    "js": ["plugins/example.js"],
    "run_at": "document_start"
}
```

# Submit your plugin #

Once your plugin is written and tested, send it to this address: romain.vallet@gmail.com

Thanks for your contribution!