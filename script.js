const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

let xImage = "./x.png";  // Ensure this path is correct
let oImage = "./o.png";// Make sure you add o.png in the same folder

let xname ="";
let oname ="nigo";



let safo3anrbe7 = ["safo3anRbe7.mp3", "safo3anRbe72.mp3", "safo3anRbe73.mp3"];
let nigorbe7 =["nigoRbe7.mp3"];
let safo3ankhser = ["safo3anKhser.mp3", "safo3anKhser2.mp3", "safo3anKhser3.mp3"];
let chkonrbe7 ;
let chkonkhser;





let playerchoice = 1;






function useCharacter(char){
    if(playerchoice== 1){
       xImage = char.getAttribute("data-src");
       xname = char.getAttribute("data-name");
       playerchoice = 2
    }else{
       oname = char.getAttribute("data-name");
       oImage = char.getAttribute("data-src");
    }

    statusDisplay.innerHTML = currentPlayerTurn();
}


const winningMessage = () => {
    if(currentPlayer === "X"){
        switch(oname){
            case "safo3an":
                chkonkhser= "safo3an"; break;
            default : 
                break;
        }
        switch(xname){
            case "safo3an":
                chkonrbe7= "safo3an";
                return "😟 Weld l9ehba wins! 😔";
            case "nigo":
                chkonrbe7="nigo";
                return "😍 Nigo Wins! Well Played! 🥰";
            case "amr":
                return "😍 Ja3bo9 Wins! Well Played! 🥰";
            case "mouad":
                return "ap1 lwl Wins! 👍";
            default:
                return "ap2 tani Wins! 👍";
        }
    }else{
        switch(xname){
            case "safo3an":
                chkonkhser= "safo3an"; break;
            default : 
                break;
        }
        switch(oname){
            case "safo3an":
                chkonrbe7= "safo3an";
                return "😟 Weld l9ehba wins! 😔";
            case "nigo":
                chkonrbe7= "nigo";
                return "😍 Nigo Wins! Well Played! 🥰";
            case "amr":
                return "😍 Ja3bo9 Wins! Well Played! 🥰";
            case "mouad":
                return "ap1 lwl Wins! 👍";
            default:
                return "ap2 tani Wins! 👍";
        }
    }
}

function playAudio(){
    if(chkonkhser == "safo3an"){
        let audiosafo3ankhser = safo3ankhser[Math.floor(Math.random()* safo3ankhser.length)];
        let soundsafo3ankhserL7wa = new Audio(audiosafo3ankhser);
        soundsafo3ankhserL7wa.play();
        return;
    }
    switch(chkonrbe7){
        case "safo3an":
            let audiosafo3anrbe7 = safo3anrbe7[Math.floor(Math.random()* safo3anrbe7.length)];
            let soundsafo3anrbe7 = new Audio(audiosafo3anrbe7);
            soundsafo3anrbe7.play(); break;
        case "nigo":
            let audionigorbe7 = nigorbe7[Math.floor(Math.random()* nigorbe7.length)];
            let soundnigorbe7 = new Audio(audionigorbe7);
            soundnigorbe7.play(); break;
    }
    
}
    // currentPlayer === "X" ? "😟 Weld l9ehba wins! 😔" : "😍 Weld Nass Wins! Well Played! 🥰";
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => {
    if(currentPlayer === "X"){
        switch(xname){
            case "safo3an":
                return "It's Safo3an Turn😑";
            case "nigo":
                return "It's Nigo Turn 😉";
            case "amr":
                return "It's Ja3bo9 Turn 😜";
            case "mouad":
                return "It's ap1 lwl Turn 🤨";
            case "lakhdar":
                return "It's ap1 tani Turn👍";
            default:
                xname= "safo3an";
                return "Choose two characters!";
        }
    }else{
        switch(oname){
            case "safo3an":
                return "It's Safo3an Turn😑";
            case "nigo":
                return "It's Nigo Turn 😉";
            case "amr":
                return "It's Ja3bo9 Turn 😜";
            case "mouad":
                return "It's ap1 lwl Turn 🤨";
            default:
                return "It's ap1 tani Turn👍";
        }
    }
}
    // currentPlayer === "X"? "It's P1 Turn" : "It's P2 Turn";

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    // Create image element
    const img = document.createElement("img");
    img.src = currentPlayer === "X" ? xImage : oImage;
    img.alt = currentPlayer;
    img.style.width = "55px";  // Adjust the size as needed
    img.style.height = "55px";

    // Append image to cell
    clickedCell.appendChild(img);
}

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        playAudio();
        
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}




function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    xImage= "./x.png";
    oImage= "./o.png";
    chkonkhser="";
    chkonrbe7="";
    xname="";
    oname="nigo";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    playerchoice= 1;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}







