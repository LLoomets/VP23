exports.timeETformatted = function(){
	let timeNow = new Date();
	let timeET = (timeNow.getHours()) + ":" + (timeNow.getMinutes()) + ":" + (timeNow.getSeconds()) + ":";
	return timeET;
}