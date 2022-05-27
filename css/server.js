const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	const page = url.parse(req.url).pathname;
	// const params = querystring.parse(url.parse(req.url).query);
	if (page == '/') {
		fs.readFile('index.html', function(err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			res.end();
		});
	}
	if (page == '/random') {
		const random = Math.floor(Math.random() * 100);
		console.log('random', random);
        res.setHeader('Content-Type', 'application/json');
        const res=picker(random)
        const response={
            
            random: random,
            picker:res

        }
        res.end(JSON.stringify(response));

	}
});
// random (1,100)
// Rock/Paper/Scissor/Lizard/Spock
const picker = (random) => {
	let result;
	switch (true) {
		case random < 20:
			result = 'rock'; //🪨
			break;
		case random < 40:
            result = 'paper'; //✂️
			break;
		case random < 60:
            result = 'scissors'; //📜
			break;
		case random < 80:
            result = 'lizard'; //🦎
			break;
		case random < 100:
            result = 'spock'; //👽
			break;
	}

	return result;
};


server.listen(8000);
