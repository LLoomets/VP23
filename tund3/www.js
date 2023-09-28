const http = require("http");

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Liisi Loomets, veebiprogrammeerimine 2023</title><style>body {background-color:gainsboro;}</style></head><body>');
	res.write('<h1>Liisi Loomets</h1><p>See veebileht on valminud <a href="https://www.tlu.ee/" target="_blank">TLÜ</a> Digitehnoloogiate instituudi informaatika eriala õppetöö raames.</p><hr><h2>Minu tutvustus</h2><p>Mina olen Tallinna Ülikooli Digitehnoloogiate instituudi õpilane.</p>');
	res.write('<hr></body></html>');
	//valmis, saada ära
	return res.end();
}).listen(5110);

//rinde		5100
//Liisi 	5110