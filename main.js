document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    const newGame = document.querySelector('#start-btn');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;             //change this to set difficulty
    let isGameOver = false;
    let gap = 430;

    document.querySelector('.modal__holder').style.display = 'none'
    function startGame(){
        birdBottom -= gravity; //gravity is a property
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
        isGameOver = false;
        console.log("Start game");
    }

    newGame.addEventListener('click', startGame)
    let gameTimerId = setInterval(startGame,20)

    // function startersUp(){
    //     console.log("start up");
    //     gameTimerId = setInterval(startGame,20);
    //     isGameOver = false
    //     document.addEventListener('keyup', control)
    //     document.querySelector('.modal__holder').style.display = 'none'
    //     pipes();
    // }

    function control(e) {
        if (e.code === "Space" || e.key === "ArrowUp") {    //used keyCode method, assigned spaceBar & upArrowKey to invoke jump function
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
        obstacle.style.bottom = obstacleBottom + 'px'
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
            //this logic is for....
            //let condA = obstacleLeft > 200 && obstacleLeft < 200 && birdLeft === 220; //&&
            let condA = obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220; //&&
            let condB = (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200);//||
            let condC = birdBottom === 0;
            if ((condA && condB) || condC) {
                gameOver(); //fire on game over
                clearInterval(timerId);
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
    }
})

