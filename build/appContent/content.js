
// listener event message
var addOnMessageListener = function(){
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		eval(request)
	});
};

//  interval enviando localização, caso mude, par ao ususario mostre

addOnMessageListener();

