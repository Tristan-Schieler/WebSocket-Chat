/* ********************************************************************************************** */
/* ************************************* packages and setup ************************************* */
/* ********************************************************************************************** */

const RandomMeme = require('./Ascii_DataBase.js'); //data bank of ascii art
const WebSocket = require('ws'); //server use
const fs = require("fs");//reading file

//terminal style//
const term = require('terminal-kit').terminal; //printing style 
term.grabInput(true);//geting terminal input with terminal-kit

//reading file//
const content = fs.readFileSync("expression.json");//reading expression
const myjson = JSON.parse(content);//parsing object in file

let inputbuffer = '';//string variable for input buffer

//testing for valid user name and connecting to server..
const regex = /^[\w]{3,10}$/; //alpha-numeric 3-10 digits
const bool = regex.test(process.argv[2]);
const username = process.argv[2];
const  port = process.argv[3] || 'localhost';
const host = process.argv[4] || '4930';
    if (bool)
        ws = new WebSocket(`ws://${port}:${host}/?username=${username}`);//loging into server
    else{
        term.bgRed("Username must be alpha-numeric between 3-10 digits.");
        process.exit();
    }


/* ********************************************************************************************** */
/* ************************************* Sending to server ************************************** */
/* ********************************************************************************************** */

    //Format for messages//
const craftMessage = (from, to, kind, data) => JSON.stringify({
    from, to, kind, data,
  });

    //Format of actions to send to server.//
const Message = {
    GLOBAL: message => craftMessage(username, 'all', 'chat', message),
    DIRECT: (to, message) => craftMessage(username, to, 'direct', message),
    USER_LIST: () => craftMessage(username, '', 'userlist', ''),
    USERNAME: () => craftMessage(username, '', 'whoami', ''),
};

/* ********************************************************************************************** */
/* ********************************** Recieving from server ************************************* */
/* ********************************************************************************************** */

//async recieving data from server//
ws.on('message', function incoming(Serverdata){
    
    term.eraseLine();//erase current line
    term.left(inputbuffer.length)//move back to left side of terminal

    Data = JSON.parse(Serverdata);//parse serverdata object
    
    if(!Data.data)//if it can't be parsed don't mess with if
        return;
    
        let newdata = Data.data.toString();//make sure data is a string

    //printing from, to, and kind//    
    term.gray('<'+ Data.from + '> ');
    if(Data.to == "all")
        term("\"all\" ");
    else
        term.green("<" + Data.to + "> ");
    term.blue(Data.kind + ': ');

    //printing data//
    let segments = newdata.split(' ')//split up each word from data
    loop1:
    for(j = 0 ; j < segments.length ; j++){
        loop2:
        for(i=0 ; i < myjson.length ; i++){
            if(segments[j] === myjson[i].expression){//if same as json expression
                findstyle(myjson[i].style, segments[j]);//find style
                term(' ');
                continue loop1;//skip rest of loop2 to avoid printing twice
            }
        }
        if(Data.kind == 'direct'){
            term.magenta(segments[j]);
            term(' ');
        }
        else if(Data.kind == 'error'){
            term.bgRed(segments[j]);
            term.bgRed(' ');
        }            
        else if(Data.kind == 'connection'){
            term.white(segments[j]);
            term(' ');
        }
        else if(Data.kind == 'userlist'){
            term.bgWhite.black(segments[j]);
            term.bgWhite(' ');
        }
        else{
            term.green(segments[j]);
            term(' ');  
        }
    }
    term("\n");

    term(inputbuffer);//put input buffer back
});

/* ********************************************************************************************** */
/* ************************************** Client Interface ************************************** */
/* ********************************************************************************************** */

term.bgYellow.black('Type "help" for action list');
term("\n");

    //switch fo picking type of interaction
function moldinput(input){
    let segments = input.split(' ');//split single string into array of strings
    let sentence ='';
    switch (segments[0].toUpperCase()){//checks all letter case combinations
        case 'HELP':            
            term.bold.yellow(`
            ACTION LIST:`);
            console.log(`
            g: Global Message
            d: Direct message
            ul: Get User List
            u: Get Username
            rm: Random Meme
            exit: Exit`);
            break;
        case 'G':
            segments.splice(0,1);//takes off G
            sentence = segments.join(' ');//joins everything back
            ws.send(Message.GLOBAL(sentence));//sends to server
            break;
        case 'D':
            let reciever = segments[1];//saves adress
            segments.splice(0,2);//takes off D and adress
            sentence = segments.join(' ');//joins the rest
            ws.send(Message.DIRECT(reciever, sentence));
            break;
        case 'UL':
            ws.send(Message.USER_LIST());
            break;
        case 'U':
            ws.send(Message.USERNAME());
            break;
        case 'RM':
            ws.send(Message.DIRECT(segments[1], RandomMeme.PickMeme()));
            break;
        case 'EXIT':
            term.grabInput(false) ;          
            process.stdin.destroy();
            term.bgRed('You have left the server');
            process.exit();
            break;
        default: 
            term.bgRed('Command entered does not exist please try another\n');
            term.bgYellow.black('Type \"Help\" for action list\n');
            
    }
};

/* ********************************************************************************************** */
/* **************************************** Input Buffer **************************************** */
/* ********************************************************************************************** */

term.on('key', (press) => {
    term.eraseLine();//erase current line
    term.left(inputbuffer.length)//move back to left side of terminal
    switch(press){
        case 'CTRL_C':
            term.bgRed('You have left the server');
            process.exit();
            break;
        case 'ENTER':
            console.log(inputbuffer)
            moldinput(inputbuffer);//send to switch on enter
            inputbuffer = '';//reset input buffer
            break;
        case 'BACKSPACE':
            inputbuffer = inputbuffer.slice(0, -1);//take off last index
            term(inputbuffer);
            break;
        default:
            inputbuffer += press;//add character into input
            term(inputbuffer);
            break;
    }
})

/* ********************************************************************************************** */
/* **************************************** json styles ***************************************** */
/* ********************************************************************************************** */

function findstyle(style, word){
    switch(style){
        case 'yellow':
            term.yellow(word);
            break;
        case 'blue':
            term.blue(word)
            break;
        case 'red':
            term.red(word);
            break;
        case 'bold':
            term.bold(word);
            break;
    }
}
