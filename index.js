var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)


function show($el) {
    $el.classList.remove('hide')
}
function hide($el) {
    $el.classList.add('hide')
}
function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled','true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    var interval = setInterval(() => {
        var time = parseFloat($time.textContent)
        
        if (time <= 0) {  
            clearInterval(interval) 
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
     
    renderBox();
}
function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}
function setGameTime(){
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader) 
}
function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if(event.target.dataset.box) {
        score++
        renderBox()
    }
}
function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div') 
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = (gameSize.height - boxSize) 
    var maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor =  cc()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box','true')

    $game.insertAdjacentElement('afterbegin', box)
}
function setGameScore() {
    $result.textContent = score.toString()
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function cc(){
        var r=Math.floor(Math.random() * (1 - 256));
        var g=Math.floor(Math.random() * (1 - 256));
        var b=Math.floor(Math.random() * (1 - 256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }
    