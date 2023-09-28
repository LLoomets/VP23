exports.dateETformatted = function(){
	
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	
	let timeNow = new Date();
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear() + " " + timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

