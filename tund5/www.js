const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const querystring = require('querystring');
const dateTime = require('./datetime_et');

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Liisi Loomets, veebiprogrammeerimine 2023</title>\n\t<style>body {background-color:gainsboro;}</style>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">';
const pageBody = '\n\t<h1>Liisi Loomets</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p>\n<hr>\n\t<h2>Minu tutvustus</h2><p>Mina olen Tallinna ülikooli Digitehnoloogiate instituudi õpilane.</p>';
const pageFoot = '\n\t<hr>\n</body>\n</html>';

function semesterProgressValue() {
    let semesterBegin = new Date('08/28/2023'); //semestri algus
    let semesterEnd = new Date('01/28/2024'); //semestri lõpp
    let dateNow = new Date(); //täna

        //Semestri algus
    if (semesterBegin > dateNow) {
        semesterValue = "Semester pole veel alanud.";
    }
        //Semestri lõpp
    if (semesterEnd < dateNow) {
        semesterValue = "Semester on juba läbi.";
    }
        //Semester veel kestab
    if (semesterBegin < dateNow && semesterEnd > dateNow) {
        let semesterLastedFor = Math.floor((dateNow.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
        let semesterDaysLeft = Math.floor((semesterEnd.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
        let semesterDays = Math.floor((semesterEnd.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
        semesterValue = "Semester on kestnud " + semesterLastedFor + " päeva. Semestri lõpuni on jäänud " + semesterDaysLeft + ` päeva.<br><meter min='0' max='${semesterDays}' value='${semesterLastedFor}'></meter>`;
    }
    return semesterValue
}

http.createServer(function(req, res) {
	let currentURL = url.parse(req.url, true);
	console.log(currentURL);
	if (req.method === 'POST'){
		
		collectRequestData(req, result => {
            console.log(result);
			//kirjutame andmeid tekstifaili
			fs.open('public/log.txt', 'a', (err, file)=>{
				if(err){
					throw err;
				}
				else {
					fs.appendFile('public/log.txt', result.firstNameInput + ';', (err)=>{
						if (err){
							throw err;
						}
						else {
							console.log('faili kirjutati');
						}
					})
					fs.close(file, (err)=>{
						if(err){
							throw err;
						}
					});
				}
			});
			
			res.end(result.firstNameInput);
			//res.end('Tuligi POST!');
		});
	}
	
	else if (currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
        res.write('\n\t<hr><p>Lehe avamisel oli kell ' + dateTime.timeETformatted() + '. Praegu on ' + dateTime.timeOfDayET() + '</p>');
		res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi</a>!</p>');
        res.write('\n\t<p><a href="semesterprogress">Semestri progress</a></p>');
        res.write('\n\t<p><a href="tluphoto"TLÜ foto</a>Ilus TLÜ pildike</p>');
		res.write(pageFoot);
		//console.log("Keegi vaatab");
		//valmis, saada Ã¤ra
		return res.end();
	}
	
	else if (currentURL.pathname === "/addname"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi!</h2>');
		res.write('\n\t<form method="POST">\n\t<label for="firstNameInput">Eesnimi: </label>\n\t<input type="text" name="firstNameInput" id="firstNameInput" placeholder="Sinu eesnimi ...">\n\t<br>\n\t<label for="lasttNameInput">Perekonnanimi: </label>\n\t<input type="text" name="lastNameInput" id="lasttNameInput" placeholder="Sinu perekonnanimi ...">\n\t<br>\n<input type="submit" name="nameSubmit" value="Salvesta">\n\t</form>');
		res.write(pageFoot);
		return res.end();
	}

    else if (currentURL.pathname === "/semesterprogress") {
        res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
        res.write('\n\t<hr><h2>Semestri progress</h2>');
        let semesterProgressCall = semesterProgressValue();
        res.write(semesterProgressCall);
        res.write(pageFoot);
        return res.end();
    }

    else if (currentURL.pathname === "/tluphoto") {
		//loeme kataloogist fotode nimekirja ja loosime ühe pildi
		let htmlOutput = '\n\t<p>Pilti ei saa näidata!</p>';
		let listOutput = '';
		fs.readdir('public/tluphotos', (err, fileList)=>{
			if (err){
				throw err;
				tluPhotoPage(res, htmlOutput, listOutput);
				}
				else {
					//console.log(fileList);
					let photoNum = Math.floor(Math.random() * fileList.length);
					htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt = "TLÜ foto">';
					//console.log(htmlOutput);
					listOutput = '\n\t<ul>';
					for (fileName of fileList){
						listOutput += '\n\t<li>' + fileName + '</li>';
					}
					listOutput += '\n\t</ul>';
					//console.log(listOutput);
					tluPhotoPage(res, htmlOutput, listOutput);
				}
		});
    }
	
	else if(currentURL.pathname === "/banner.png"){
		console.log("Tahame pilti!");
		let bannerPath = path.join(__dirname, "public", "banner");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err) {
				throw err;
			}
			else {
				res.writeHead(200,{"Content-type": "image/png"});
				res.end(data);
			}
		});
	}

    //else if (currentURL.pathname === "/tlu_41.jpg") {
	else if (path.extname(currentURL.pathname) === ".jpg") {
		console.log(path.extname(currentURL.pathname));
        let photoPath = path.join(__dirname, "public", "tluphotos");
        fs.readFile(photoPath + currentURL.pathname, (err, data)=> {
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, {"Content-type": "image/jpg"});
                res.end(data);
            }
        })
    }

	else {
		res.end("ERROR 404");
	}
}).listen(5110);

function tluPhotoPage(res, htmlOutput, listOutput){
	res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
        res.write('\n\t<hr>');
		res.write(htmlOutput);
		if (listOutput != ''){
			res.write(listOutput);
		}
        res.write('\n\t<img src="tlu_41.jpg" alt="TLÜ foto">');		
        res.write(pageFoot);
        return res.end();
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}

//rinde		5100
//Liisi 	5110