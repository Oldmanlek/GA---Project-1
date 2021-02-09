document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    //const ground = document.querySelector('.ground');
    const newGame = document.querySelector('#start-btn');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 1;             //change this to set difficulty
    let isGameOver = false;
    let gap = 430;
    // let score = 0;
    //
    // const gameState = [{
    //     current: 0,
    //     getReady : 0,
    //     inGame : 1,
    //     over : 2
    // }];
    //
    //
    // function stateOfGame(){
    //     if(gameState == gameState[0].inGame){
    //         stateOfGame();
    //         console.log("??")
    //     }
    // }
    document.querySelector('.modal__holder').style.display = 'none'
    function startersUp(){
        // document.querySelector('.modal__holder').style.display = 'block'
        // newGame.addEventListener('click', startGame)
        // isGameOver = false
        birdBottom -= gravity; //gravity is a property
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerId = setInterval(startersUp,30)


    function control(e) {
        if (e.code === "Space" || e.key === "ArrowUp") {    //used keyCode method, assigned spacebar & upArrowKey to invoke jump function
            jump()
        }
    }
    function jump(){
        if(birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)
                                            //making of pipes
    function pipes(){  //creating the obstacle function
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver){
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        } //add class name obstacle in element we created the line above
        gameContainer.appendChild(obstacle) //placing the obstacle we created into the game container
        gameContainer.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = 50 + obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
                                            //making the pipes move from left to right
        function movePipes(){
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            if (obstacleLeft === -50){
                clearInterval(timerId)
                gameContainer.removeChild(obstacle)
                gameContainer.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 200 && birdLeft === 200 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -150) ||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(movePipes, 20) //
        if (!isGameOver) setTimeout(pipes,3000)
    }
    pipes();
                                            //gameOver state
    function gameOver(){
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
        document.querySelector('.modal__holder').style.display='block'
        // newGame.addEventListener('click', startGame)
    }
})

