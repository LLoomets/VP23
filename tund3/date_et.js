exports.dateETformated = function(){
	const monthNamesET = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni",
	 "juuli", "august", "september", "oktoober", "novemeber", "detsember"];
	let timeNow = new Date();
	//console.log(timeNow)
	let dateNow =  timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	//let dateET = dateNow + "." + (monthNow + 1) + "." + yearNow;
	let dateET = dateNow + ". " + monthNamesET[monthNow] + " " + yearNow;
	return dateET;
}