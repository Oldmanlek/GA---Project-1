document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 1;             //change this to set difficulty
    let isGameOver = false;
    let gap = 430;

    // const gameState = {
    //     current: 0,
    //     getReady : 0,
    //     inGame : 1,
    //     over : 2
    // }
    // //
    // // document.addEventListener("click", function(e){
    // //     if(gameState == gameState[0]){
    // //         console.log('we are in current')
    // //     }
    // // })
    // //
    // // //edit code above for gameSate

    function startGame(){
        birdBottom -= gravity; //gravity is a property
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 38 || e.keyCode === 32) {    //used keyCode method, assigned spacebar & upArrowKey to invoke jump function
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
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) ||
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
        console.log("game over?")
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})

