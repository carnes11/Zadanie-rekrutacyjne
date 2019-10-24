document.addEventListener("DOMContentLoaded", function(event) {
  var selectGreen, countdownTimer, cleanGreenSquare, alertTimeout;
  var TableSize = 5;
  var Lifes = "3";
  var Points = "0";
  var Time = "60";
  document.getElementById("lifes").textContent = Lifes;
  document.getElementById("points").textContent = Points;
  document.getElementById("timer").textContent = Time;
  generateTable(TableSize);

  document.getElementById("start").onclick = startGame;
  document.getElementById("reset").onclick = resetGame;

  var squares = document.querySelectorAll("#square");

  function startGame(){
    stopGame();
    document.getElementById("points").textContent = Points;
    document.getElementById("lifes").textContent = Lifes;
    document.getElementById("timer").textContent = Time;
    addClickEventListenerToSquares();
    selectGreen = setInterval(selectSquare, 3000);
    startTimer();
  }

  function resetGame(){
    stopGame();
    document.getElementById("points").textContent = Points;
    document.getElementById("lifes").textContent = Lifes;
    document.getElementById("timer").textContent = Time;
    removeClickEventListenerFromSquares();
  }

  function startTimer() {
    countdownTimer = setInterval(function(){
      var time = document.getElementById("timer");
      var timeNumber = parseInt(time.innerHTML);
      if(timeNumber > 0) {
        timeNumber--;
        var tmpText = timeNumber.toString();
        time.textContent = tmpText;
      } else {
        stopGame();
      }
    }, 1000);
  }

  function stopGame(){
    clearAlert();
    clearTimeout(alertTimeout);
    clearInterval(selectGreen);
    clearInterval(countdownTimer);
    clearTimeout(cleanGreenSquare);
    removeSelection();
    removeClickEventListenerFromSquares();
  }

  function selectSquare(){
    var square = squares[Math.floor(Math.random()*squares.length)];
    square.classList.add("green");
    cleanGreenSquare = setTimeout(removeSelection, 2000);
  }

  function removeSelection(){
    var selectedSquare = document.querySelector(".green");
    if(selectedSquare) {
      selectedSquare.classList.remove("green");
      takeOneLife();
    }
  }

  function checkSquare(){
    if(this.classList.contains("green")){
      addPoint(this);
    } else {
      takeOneLife();
    }
  }

  function addPoint(clickedSquare){
    var points = document.getElementById("points");
    var pointsNumber = parseInt(points.innerHTML);
    pointsNumber++;
    var tmpText = pointsNumber.toString();
    points.textContent = tmpText;
    clickedSquare.classList.remove("green")
  }

  function takeOneLife(){
    var lifes = document.getElementById("lifes");
    var lifesNumber = parseInt(lifes.innerHTML);
    if(lifesNumber > 0) {
      sendAlert("Straciłeś życie!");
      lifesNumber--;
      var tmpText = lifesNumber.toString();
      lifes.textContent = tmpText;
    } else {
      stopGame();
      sendAlert("Koniec żyć!");
    }
  }

  function sendAlert(message: string){
    clearTimeout(alertTimeout);
    var element = document.querySelector(".notification");
    element.classList.add("alert", "alert-danger");
    element.textContent = message;
    alertTimeout = setTimeout(function(){
      element.classList.remove("alert", "alert-danger");
      element.textContent = ""
    },2000);
  }

  function clearAlert(){
    var element = document.querySelector(".notification");
    element.classList.remove("alert", "alert-danger");
    element.textContent = ""
  }

  function addClickEventListenerToSquares(){
    for (var i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", checkSquare);
    }
  }

  function removeClickEventListenerFromSquares(){
    for (var i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", checkSquare);
    }
  }

  function generateTable(x: number){
    var gameBoardTable = document.createElement('table');
    gameBoardTable.setAttribute("id", "gameTable");
    for (let i = 0; i < x; i++) {
      var row = gameBoardTable.insertRow();
      for(let j = 0; j < x; j++) {
        var cell = row.insertCell();
        var square = document.createElement('div');
        square.setAttribute("id", "square");
        square.setAttribute("class", "border border-dark square");
        cell.appendChild(square);
      }
    }
    document.getElementById("game-squares").appendChild(gameBoardTable);
  }
});
