document.getElementById("whackAMoleButton").addEventListener("click", ()=> {
    disappearGamesContainer();

    var whackContainer = document.createElement("div");
    whackContainer.setAttribute("id", "whackContainer");

    var header = document.createElement("h2");
    header.innerHTML = "Whack a Mole!";
    whackContainer.append(header);

    var scoreWhack = document.createElement("h3");
    scoreWhack.innerHTML = "Your score:<span id='score'>0</span>";
    whackContainer.append(scoreWhack);

    var time = document.createElement("h3");
    time.setAttribute("id", "time");
    time.innerHTML = "Seconds left:<span id='timeLeft'>10</span>";
    whackContainer.append(time);

    var gridWhack = document.createElement("div");
    gridWhack.setAttribute("class", "gridWhack");

    var playAgain = document.createElement("div");
    playAgain.setAttribute("id", "playAgain");

    var gameOver = document.createElement("h2");
    gameOver.innerHTML = "Game Over!!!";

    var playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("id", "playAgainBtn");
    playAgainBtn.innerHTML = "Play Again?";
    playAgainBtn.addEventListener("click", ()=>{
        playAgain.remove();
        whackContainer.insertBefore(gridWhack, finishBtn);
        document.getElementById("timeLeft").innerHTML = "10";
        score.innerHTML = 0;
        result = 0;
        currentTime = timeLeft.textContent;
        timeId = setInterval(countDown, 1000);
    })

    playAgain.append(gameOver);
    playAgain.append(playAgainBtn);

    for (var i = 1, len = 9; i <= len; i++){
        var divs = document.createElement("div");
        divs.setAttribute("id", i);
        divs.setAttribute("class", "square");
        if(i == 1){
            divs.setAttribute("class", "square mole");
        }
        gridWhack.append(divs);
    }

    whackContainer.append(gridWhack);
    gamingArea.append(whackContainer);

    const square = document.querySelectorAll('.square');
    const mole = document.querySelectorAll('.mole');
    const timeLeft = document.querySelector('#timeLeft');
    let score = document.querySelector('#score');

    let result = 0;
    let currentTime = timeLeft.textContent;

    function randomSquare(){
        square.forEach(className => {
            className.classList.remove('mole')
        });
        let randomPosition = square[Math.floor(Math.random()*9)];
        randomPosition.classList.add('mole');

        //assign the id of the randomPosition to hitPosition

        hitPosition = randomPosition.id;
    }
    square.forEach(id=> {
        id.addEventListener('mouseup', ()=>{
            if(id.id === hitPosition){
                result = result + 1;
                score.textContent = result;
            }
        })
    })


    function moveMole(){
        let timeId = null;
        timeId = setInterval(randomSquare, 1000);
    }

    moveMole();

    function  countDown() {
        currentTime--;
        timeLeft.textContent = currentTime;

        if(currentTime === 0){
            clearInterval(timeId);
            gridWhack.remove();
            currentTime = 10;
            whackContainer.insertBefore(playAgain, finishBtn);

        }
    }

    let timeId = setInterval(countDown, 1000);

    var finishBtn = document.createElement("button");
    finishBtn.innerHTML = "Finish Game";
    finishBtn.addEventListener("click", ()=>{
        whackContainer.remove();
        gamesContainer.style.display = "flex";
        /*gamesContainer.style.flexDirection = "column";*/
        clearTimeout(timeId);
    });
    
    whackContainer.append(finishBtn);
});