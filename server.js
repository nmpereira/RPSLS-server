const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet=require('figlet')

const server = http.createServer((req, res) => {
    const readWrite = (file, contentType) => {
        fs.readFile(file, function(err, data) {
          res.writeHead(200, {'Content-Type': contentType});
          res.write(data);
          res.end();
        });
      }

	const page = url.parse(req.url).pathname;
	if (page == '/') {
        readWrite("index.html", "text/html");
	} else if (page == '/random') {
        const params = querystring.parse(url.parse(req.url).query);
        let response
        if(params['user']){
            res.setHeader('Content-Type', 'application/json');
            let userPick=params['user'];
            const random = Math.ceil(Math.random() * 5)
            // computer selection
            let result=picker(random);
            // user selection
            let winner=winnerWinner(userPick,result)
           let logic=''

            if(winner==='user wins!'){
               logic=  winReason(userPick,result)
            }else if(winner==='computer wins!'){
               logic= winReason(result,userPick)
            }else{
                logic='tie'
            }
            response = {
                random: random,
                computer: result,
                user: userPick,
                winner: winner,
                logic:logic
            }
        
        }else{
            response = {error:'please input your choice in the url as a query like ?user=paper'}
        }
        res.end(JSON.stringify(response));

        // 
	} else if (page == '/css/style.css'){
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      } else if (page == '/js/main.js'){
        readWrite("js/main.js", "text/javascript");
      }
    else {
    figlet('ERROR 404!!', function (err, data) {
        if (err) {
        console.log('Something went wrong...')
        console.dir(err)
        return
        }
        res.write(data)
        res.end()
    })

    }
});
// random (1,100)
// Rock/Paper/Scissor/Lizard/Spock
const picker = (random) => {
	let result;
	switch (true) {
        case random === 1:
            result = 'rock'; //🤨
            break;
        case random === 2:
            result = 'paper'; //📜
			break;
        case random === 3:
            result = 'scissors'; //✂️
            break;
        case random === 4:
            result = 'lizard'; //🦎
            break;
        case random === 5:
            result = 'spock'; //👽
            break;
}

	return result;
};


// Game conditions
const winnerWinner=(userDinner,computerDinner) => {
    let winner;
        if (userDinner === computerDinner){
            winner = 'tie';   
        }else if ((userDinner === 'rock'     && (computerDinner === 'scissors' || computerDinner === 'lizard'  ) ) ||  
                  (userDinner === 'paper'    && (computerDinner === 'rock'     || computerDinner === 'spock'   ) ) || 
                  (userDinner === 'scissors' && (computerDinner === 'paper'    || computerDinner === 'lizard'  ) ) || 
                  (userDinner === 'lizard'   && (computerDinner === 'paper'    || computerDinner === 'spock'   ) ) || 
                  (userDinner === 'spock'    && (computerDinner === 'rock'     || computerDinner === 'scissors') )) {
            winner = 'user wins!'    
        }else { 
            winner = 'computer wins!';
        }

     //scissors beats paper & lizard
     //paper beats rock & spock
     //lizard beats spock & paper
     //spock beats scissors & rock
    //rock beats scissors & lizard

     return winner;
 } 

 // winReason function => winners Description
const winReason=(winChoice, loseChoice) => { 
	switch (winChoice) {
		case 'rock':
			if (loseChoice === 'scissors') {
				return 'rock crushes scissors';
			} else if (loseChoice ==='lizard') {
				return 'rock crushes lizard';
			}
        break;
		case 'paper':
			if (loseChoice === 'rock') {
				return 'paper covers rock';
			} else if (loseChoice ==='spock') {
				return 'paper disproves spock';
			}
        break;
		case 'scissors':
			if (loseChoice === 'paper') {
				return 'scissors cut paper';
			} else if (loseChoice ==='lizard') {
				return 'scissors decapitates lizard';
			}
        break;
		case 'lizard':
			if (loseChoice === 'paper') {
				return 'lizard eats paper';
			} else if (loseChoice ==='spock') {
				return 'lizard poisons spock';
			}
        break;
		case 'spock':
			if (loseChoice === 'rock') {
				return 'spock vaporises rock';
			} else if (loseChoice ==='scissors') {
				return 'spock smashes scissors';
			}
            break;
        default:  
            return 'something broke';
	}
}

// Port
server.listen(process.env.PORT||8000)
