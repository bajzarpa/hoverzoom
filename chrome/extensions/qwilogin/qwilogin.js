// Fills a field with a value if it is empty
function fillField(field, value) {
    if (field && field.value == "")
        field.value = value;    
}

// Requests options from the extension and fills the fields
chrome.extension.sendRequest({what: "options"}, function(response) {
    if (!response.options)
        return;
        
    var options = JSON.parse(response.options);
    if (!options)
        return;
   
    if (options.nickname)
        fillField(document.getElementsByTagName("input")[0], options.nickname);

    if (options.channels) 
        fillField(document.getElementsByTagName("input")[1], options.channels);
});


   

