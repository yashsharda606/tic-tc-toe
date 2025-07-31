let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// playerX, player0
let turnX = true;
var boxFilled = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6], 
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const disableBoxes = () => {
  for(let box of boxes) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for(let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const resetGame = () => {
  turnX = true;
  boxFilled = 0; 
  enableBoxes();
  msgContainer.classList.add("hide"); 
}

const showWinner = (winner) => {
  msg.innerText = `Congratulation!!! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkDraw = () => {
  msg.innerText = `Its a Draw...`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for(pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    // console.log(pos1, pos2, pos3);
    if(pos1===pos2 && pos2===pos3 && pos1!="") {
      // console.log("Winner: ", pos1);

      showWinner(pos1);
      return true;
    }
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked");
    if(turnX) {
      box.innerHTML = "X";
      box.style.color = "#6A0572";
      turnX = false;
    }
    else {
      box.innerHTML = "0";
      turnX = true;
    }
    box.disabled = true; 
    boxFilled++;
    // console.log("boxFilled: ",boxFilled);

    let hasWinner = checkWinner();
    if (!hasWinner && boxFilled === 9) {
      checkDraw();
    }

  }); 
});
 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
