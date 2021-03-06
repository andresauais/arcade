var mainArr = JSON.parse(localStorage.getItem("arr"));
document.getElementById("spaceButton").addEventListener("click", function spaceStart(){
    document.getElementById("scoreboardBtn").disabled = true;
    disappearGamesContainer();
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 32 && e.target == document.body) {
          e.preventDefault();
        }
      });
    var spaceContainer = document.createElement("div");
    spaceContainer.setAttribute("id", "spaceContainer");
    
    var spaceGrid = document.createElement("div");
    spaceGrid.setAttribute("id", "spaceGrid");

    var spaceScore = document.createElement("h3");
    spaceScore.setAttribute("id", "spaceHeader");
    spaceScore.innerHTML = "Score:<span id='result'></span>";

    for (var i = 0, len = 225; i < len; i++){
        var divs = document.createElement("div");
        spaceGrid.append(divs);
    }
    spaceContainer.append(spaceScore);
    spaceContainer.append(spaceGrid);

    var finishBtn = document.createElement("button");
    finishBtn.innerHTML = "Finish Game";
    finishBtn.addEventListener("click", ()=>{
        spaceContainer.remove();
        gamesContainer.style.display = "flex";
        document.getElementById("scoreboardBtn").disabled = false;
        /*gamesContainer.style.flexDirection = "column";*/
    });
    spaceContainer.append(finishBtn);
    gamingArea.append(spaceContainer);

    const squares = document.querySelectorAll('#spaceGrid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId

    //define the alien invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //draw the alien invaders
    alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    //draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    //move the shooter along a line
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove('shooter');
        switch(e.keyCode) {
            case 37:
                e.preventDefault();
                if(currentShooterIndex % width !==0) currentShooterIndex -=1;
                break;
            case 39:
                e.preventDefault();
                if(currentShooterIndex % width < width-1) currentShooterIndex +=1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
    }
    document.addEventListener('keydown', moveShooter);

    //move alien invaders
    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length-1]% width === width -1;

        if ((leftEdge && direction === -1)|| (rightEdge && direction === 1)){
            direction = width;
        }else if(direction === width){
            if(leftEdge){
                direction = 1;
            }
            else {
                direction = -1;
            }
        }
        for (let i = 0; i<= alienInvaders.length-1; i++){
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for (let i = 0; i<= alienInvaders.length-1; i++){
            alienInvaders[i] += direction;
        }
        for (let i = 0; i<= alienInvaders.length-1; i++){
            if(!alienInvadersTakenDown.includes(i)){
                squares[alienInvaders[i]].classList.add('invader');
            }
        }

        //game over
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderId);
            spaceGrid.remove();
            mainArr.forEach(element =>{
                console.log(element.name);
                if (element.name == document.getElementById("username").innerText){
                    if(element.space < result){
                        element.space = result;
                    }
                }
            });
            localStorage.setItem("arr", JSON.stringify(mainArr));
            spaceContainer.append(playAgainBtn);
        }

        for(let i = 0; i <= alienInvaders.length-1; i++){
            if(alienInvaders[i] > (squares.length - (width - 1))){
                resultDisplay.textContent = 'Game Over';
                spaceGrid.remove();
                spaceContainer.append(playAgainBtn);
                clearInterval(invaderId);
            }
        }

        //decide a win
        if(alienInvadersTakenDown.length === alienInvaders.length){
            resultDisplay.textContent = 'You Win';
            spaceGrid.remove();
            mainArr.forEach(element =>{
                console.log(element.name);
                if (element.name == document.getElementById("username").innerText){
                    if(element.space < result){
                        element.space = result;
                    }
                }
            });
            spaceContainer.append(playAgainBtn);
        }

    }

    invaderId = setInterval(moveInvaders, 500);

    //shooting
    function shoot(e){
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        //move the laser from the shooter to the alien invader
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');
            if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                const alienTokenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTokenDown);
                result ++;
                resultDisplay.textContent = result;
            }

            if(currentLaserIndex < width){
                clearInterval(laserId);
                setTimeout(()=> squares[currentLaserIndex].classList.remove('laser'),100);
            }
        }
        switch (e.keyCode) {
            case 32:
                e.preventDefault();
                laserId = setInterval(moveLaser,100);
                break;
        }

    }
    var playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("id", "playAgainBtn");
    playAgainBtn.innerHTML = "Play Again?";
    playAgainBtn.addEventListener("click", ()=>{
        spaceContainer.remove();
        spaceStart();

    
    })

    document.addEventListener('keyup', shoot);
})