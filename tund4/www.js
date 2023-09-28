const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Liisi Loomets, veebiprogrammeerimine 2023</title>\n\t<style>body {background-color:gainsboro;}</style>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Kursuse bänner">';
const pageBody = '\n\t<h1>Liisi Loomets</h1>\n\t<p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p>\n<hr>\n\t<h2>Minu tutvustus</h2><p>Mina olen Tallinna Ülikooli Digitehnoloogiate instituudi õpilane.</p>';
const pageFoot = '\n\t<hr>\n</body>\n</html>';

http.createServer(function(req, res){
	let currentURL = url.parse(req.url, true);
	console.log(currentURL);
	if (currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi</a>!</p>');
		res.write(pageFoot);
		//console.log("Keegi vaatab");
		//valmis, saada ära
		return res.end();
	}
	
	else if (currentURL.pathname === "/addname"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi!</h2>');
		res.write('\n\t<p>Edaspidi lisame siia asju</p>');
		res.write(pageFoot);
		return res.end();
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
	else {
		res.end("ERROR 404");
	}
}).listen(5110);

//rinde		5100
//Liisi 	5110