document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-Btn");
    let newGameBtn = document.querySelector(".newGame");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turnO = true; // playerX, playerO
    let count = 0; // To Track Draw

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    // Define resetGame before using it
    const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    // Check if the newGameBtn exists before adding event listener
    if (newGameBtn) {
        newGameBtn.addEventListener("click", resetGame);
    }

    // Check if the resetBtn exists before adding event listener
    if (resetBtn) {
        resetBtn.addEventListener("click", resetGame);
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turnO) {
                // playerO
                box.innerText = "O";
                turnO = false;
            } else {
                // playerX
                box.innerText = "X";
                turnO = true;
            }
            box.style.pointerEvents = "none";
            count++;

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        });
    });

    const gameDraw = () => {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    const disableBoxes = () => {
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
    };

    const enableBoxes = () => {
        boxes.forEach((box) => {
            box.style.pointerEvents = "auto";
            box.innerText = "";
        });
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    return true;
                }
            }
        }
        return false; // Added return false when there is no winner
    };
});
