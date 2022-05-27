const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	const page = url.parse(req.url).pathname;
	if (page == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			res.end();
		});
	}
	if (page == '/random') {
        const params = querystring.parse(url.parse(req.url).query);
        let response
        if(params['user']){
            let userPick=params['user']
            
            
            
            
            const random = Math.floor(Math.random() * 100);
            
            res.setHeader('Content-Type', 'application/json');
            const result=picker(random)
            response={
                
                random: random,
                picker:result,
                userPick:userPick,
                winner:true
                
            }
        }else{
            response={error:'please input your choice  in the url as a query like ?user=paper'}
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
			result = 'rock'; //🤨
			break;
		case random < 40:
            result = 'paper'; //📜
			break;
		case random < 60:
            result = 'scissors'; //✂️
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

// const winnerwinner=(userDinner,computerDinner)=>{
//     if (userDinner === 'rock' && computerDinner === ('scissors' || 'lizard')) ||
//        (userDinner === 'paper' && computerDinner === ('rock' || 'lizard')){  //Would this work??
//
//     }  
//     //scissors beats paper & lizard
//     //paper beats rock & spock
//     //lizard beats spock & paper
//     //spock beats scissors & rock


    
// }


server.listen(8000);
