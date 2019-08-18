'use strict';

var img = [];
var context;
var turn = 0;
var mouseX = -1;
var mouseY = -1;
var playerChoice = 0;
var playerWin = 0;
var playerLose = 0;
var playerDraw = 0;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var opponentEncode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var opponentDecode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var opponentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var opponentCount = 0;
var opponentChoice = 0;
var opponentReached = 0;

for (var i = 0; i < 4; i++) {
    img[i] = new Image();
    img[i].src = 'Image_' + i + '.png';
}

function isVictory(s) {
    var marked1 = [1, 1, 1, 2, 3, 3, 4, 7];
    var marked2 = [2, 4, 5, 5, 5, 6, 5, 8];
    var marked3 = [3, 7, 9, 8, 7, 9, 6, 9];
    for (var i = 0; i < 8; i++) {
        if (board[marked1[i]] === s && board[marked2[i]] === s && board[marked3[i]] === s) {
            return 1;
        }
    }
    for (var i = 1; i < 10; i++) {
        if (board[i] === 0) {
            return 0;
        }
    }
    return 2;
}

function isReached(s) {
    var occupied1 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 7, 7, 8];
    var occupied2 = [2, 3, 4, 5, 7, 9, 3, 5, 8, 5, 6, 7, 9, 5, 6, 7, 6, 7, 8, 9, 9, 8, 9, 9];
    var vacant = [3, 2, 7, 9, 4, 5, 1, 8, 5, 7, 9, 5, 6, 6, 5, 1, 4, 3, 2, 1, 3, 9, 8, 7];
    for (var i = 0; i < 24; i++) {
        if (opponentBoard[occupied1[i]] === s && opponentBoard[occupied2[i]] === s && opponentBoard[vacant[i]] === 0) {
            return vacant[i];
        }
    }
    return 0;
}

function canvasDraw() {
    var positionX = [0, 0, 120, 240, 0, 120, 240, 0, 120, 240];
    var positionY = [0, 240, 240, 240, 120, 120, 120, 0, 0, 0];
    context.drawImage(img[0], 0, 0);
    for (var i = 1; i < 10; i++) {
        if (board[i] === 1) {
            context.drawImage(img[1], positionX[i], positionY[i]);
        } else if (board[i] === 2) {
            context.drawImage(img[2], positionX[i], positionY[i]);
        } else if (playerChoice === i) {
            context.drawImage(img[3], positionX[i], positionY[i]);
        }
    }
}

function renewal() {
    var minX = [0, 0, 120, 240, 0, 120, 240, 0, 120, 240];
    var maxX = [0, 120, 240, 360, 120, 240, 360, 120, 240, 360];
    var minY = [0, 240, 240, 240, 120, 120, 120, 0, 0, 0];
    var maxY = [0, 360, 360, 360, 240, 240, 240, 120, 120, 120];
    if (turn === 1) {
        for (var i = 1; i < 10; i++) {
            if (mouseX >= minX[i] && mouseX < maxX[i] && mouseY >= minY[i] && mouseY < maxY[i]) {
                playerChoice = i;
            }
        }
        if (board[playerChoice] !== 0) {
            playerChoice = 0;
        }
    } else {
        playerChoice = 0;
    }
}

function retryClick() {
    document.getElementById('retry').value = 'RETRY';
    document.getElementById('retry').disabled = 'disabled';
    board.splice(1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    switch (Math.floor(Math.random() * 8)) {
        case 0:
            opponentEncode.splice(1, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9);
            opponentDecode.splice(1, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9);
            break;
        case 1:
            opponentEncode.splice(1, 9, 1, 4, 7, 2, 5, 8, 3, 6, 9);
            opponentDecode.splice(1, 9, 1, 4, 7, 2, 5, 8, 3, 6, 9);
            break;
        case 2:
            opponentEncode.splice(1, 9, 7, 4, 1, 8, 5, 2, 9, 6, 3);
            opponentDecode.splice(1, 9, 3, 6, 9, 2, 5, 8, 1, 4, 7);
            break;
        case 3:
            opponentEncode.splice(1, 9, 3, 2, 1, 6, 5, 4, 9, 8, 7);
            opponentDecode.splice(1, 9, 3, 2, 1, 6, 5, 4, 9, 8, 7);
            break;
        case 4:
            opponentEncode.splice(1, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1);
            opponentDecode.splice(1, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1);
            break;
        case 5:
            opponentEncode.splice(1, 9, 9, 6, 3, 8, 5, 2, 7, 4, 1);
            opponentDecode.splice(1, 9, 9, 6, 3, 8, 5, 2, 7, 4, 1);
            break;
        case 6:
            opponentEncode.splice(1, 9, 3, 6, 9, 2, 5, 8, 1, 4, 7);
            opponentDecode.splice(1, 9, 7, 4, 1, 8, 5, 2, 9, 6, 3);
            break;
        case 7:
            opponentEncode.splice(1, 9, 7, 8, 9, 4, 5, 6, 1, 2, 3);
            opponentDecode.splice(1, 9, 7, 8, 9, 4, 5, 6, 1, 2, 3);
            break;
    }
    if ((playerWin + playerLose + playerDraw) % 2) {
        changeTurnToOpponent();
    } else {
        changeTurnToPlayer();
    }
    canvasDraw();
}

function changeTurnToPlayer() {
    turn = 1;
    document.getElementById('message').textContent = 'あなたの番です。';
    renewal();
}

function changeTurnToOpponent() {
    var forestallSecondOpponent = [1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2];
    var forestallSecondPlayer = [2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 6, 7, 8, 9, 1, 3, 4, 5, 6, 7, 8, 9];
    var forestallSecondChoice = [5, 7, 2, 8, 5, 2, 5, 3, 2, 1, 7, 2, 1, 8, 1, 3, 5, 6, 1, 4, 3, 1, 7, 3];
    var forestallThirdOpponent1 = [1, 1, 1, 1, 1, 1, 2, 5, 5, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    var forestallThirdOpponent2 = [5, 7, 2, 8, 8, 3, 5, 7, 7, 5, 8, 6, 6, 6, 6, 4, 4, 3, 7, 7, 7, 7];
    var forestallThirdPlayer1 = [2, 3, 3, 2, 5, 2, 1, 3, 3, 4, 2, 1, 3, 3, 3, 5, 5, 1, 4, 5, 6, 8];
    var forestallThirdPlayer2 = [9, 4, 4, 5, 9, 9, 8, 4, 8, 8, 7, 3, 4, 8, 9, 6, 8, 6, 8, 8, 8, 9];
    var forestallThirdChoice = [4, 9, 5, 7, 4, 7, 7, 8, 1, 1, 1, 5, 5, 5, 5, 1, 1, 5, 3, 1, 1, 1];
    var forestalledSecondOpponent = [5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    var forestalledSecondPlayer1 = [1, 3, 5, 1, 3, 3, 4, 2, 2, 1, 6, 2, 2, 6, 4, 2, 4];
    var forestalledSecondPlayer2 = [9, 7, 9, 8, 8, 4, 9, 7, 9, 6, 7, 4, 6, 8, 8, 8, 6];
    var forestalledSecondChoice = [2, 2, 3, 4, 6, 1, 7, 6, 4, 9, 3, 1, 1, 9, 1, 1, 1];
    turn = 2;
    document.getElementById('message').textContent = 'コンピュータの番です。';
    setTimeout(function() {
        opponentCount = 0;
        for (var i = 1; i < 10; i++) {
            opponentBoard[opponentEncode[i]] = board[i];
            if (board[i]) {
                opponentCount++;
            }
        }
        do {
            opponentChoice = Math.floor(Math.random() * 9) + 1;
        } while (opponentBoard[opponentChoice]);
        switch (opponentCount) {
            case 0:
                if (Math.random() < 0.7) {
                    opponentChoice = 1;
                } else if (Math.random() < 0.7) {
                    opponentChoice = 5;
                } else {
                    opponentChoice = 2;
                }
                break;
            case 1:
                if (opponentBoard[5] === 0) {
                    opponentChoice = 5;
                } else {
                    opponentChoice = 1;
                }
                break;
            case 2:
                for (var i = 0; i < 24; i++) {
                    if (opponentBoard[forestallSecondOpponent[i]] === 2 && opponentBoard[forestallSecondPlayer[i]] === 1) {
                        if (i === 3 && Math.random() < 0.5) {
                            opponentChoice = 9;
                        } else {
                            opponentChoice = forestallSecondChoice[i];
                        }
                    }
                }
                break;
            case 3:
                for (var i = 0; i < 17; i++) {
                    if (opponentBoard[forestalledSecondOpponent[i]] === 2 && opponentBoard[forestalledSecondPlayer1[i]] === 1 && opponentBoard[forestalledSecondPlayer2[i]] === 1) {
                        opponentChoice = forestalledSecondChoice[i];
                    }
                }
                break;
            case 4:
                for (var i = 0; i < 22; i++) {
                    if (opponentBoard[forestallThirdOpponent1[i]] === 2 && opponentBoard[forestallThirdOpponent2[i]] === 2 && opponentBoard[forestallThirdPlayer1[i]] === 1 && opponentBoard[forestallThirdPlayer2[i]] === 1) {
                        opponentChoice = forestallThirdChoice[i];
                    }
                }
                break;
            case 5:
                if (opponentBoard[4] === 2 && opponentBoard[5] === 2 && opponentBoard[1] === 1 && opponentBoard[6] === 1 && opponentBoard[8] === 1) {
                    if (Math.random() < 0.8) {
                        opponentChoice = 9;
                    } else {
                        opponentChoice = 7;
                    }
                }
                if (opponentBoard[5] === 2 && opponentBoard[6] === 2 && opponentBoard[3] === 1 && opponentBoard[4] === 1 && opponentBoard[8] === 1) {
                    if (Math.random() < 0.8) {
                        opponentChoice = 1;
                    } else {
                        opponentChoice = 2;
                    }
                }
                break;
        }
        opponentReached = isReached(1);
        if (opponentReached) {
            opponentChoice = opponentReached;
        }
        opponentReached = isReached(2);
        if (opponentReached) {
            opponentChoice = opponentReached;
        }
        board[opponentDecode[opponentChoice]] = 2;
        switch (isVictory(2)) {
            case 0:
                changeTurnToPlayer();
                break;
            case 1:
                opponentWins();
                break;
            case 2:
                opponentDraws();
                break;
        }
        canvasDraw();
    }, 1000);
    playerChoice = 0;
}

function opponentWins() {
    playerLose++;
    turn = 0;
    document.getElementById('retry').disabled = '';
    document.getElementById('message').textContent = 'コンピュータの勝利です。';
    document.getElementById('result').textContent = 'ただいまの成績：' + playerWin + '勝、' + playerLose + '敗、' + playerDraw + '分';
}

function opponentLoses() {
    playerWin++;
    turn = 0;
    document.getElementById('retry').disabled = '';
    document.getElementById('message').textContent = 'あなたの勝利です。';
    document.getElementById('result').textContent = 'ただいまの成績：' + playerWin + '勝、' + playerLose + '敗、' + playerDraw + '分';
}

function opponentDraws() {
    playerDraw++;
    turn = 0;
    document.getElementById('retry').disabled = '';
    document.getElementById('message').textContent = '引き分けです。';
    document.getElementById('result').textContent = 'ただいまの成績：' + playerWin + '勝、' + playerLose + '敗、' + playerDraw + '分';
}

window.addEventListener('load', function(e) {
    var canvas = document.getElementById('marubatsu');
    canvas.addEventListener('mousemove', function(e) {
        var rect = e.target.getBoundingClientRect();
        mouseX = Math.floor(e.clientX - rect.left);
        mouseY = Math.floor(e.clientY - rect.top);
        renewal();
        canvasDraw();
    }, false);
    canvas.addEventListener('mouseout', function(e) {
        mouseX = -1;
        mouseY = -1;
        playerChoice = 0;
        canvasDraw();
    }, false);
    canvas.addEventListener('click', function(e) {
        if (playerChoice) {
            board[playerChoice] = 1;
            switch (isVictory(1)) {
                case 0:
                    changeTurnToOpponent();
                    break;
                case 1:
                    opponentLoses();
                    break;
                case 2:
                    opponentDraws();
                    break;
            }
            canvasDraw();
        }
    }, false);
    context = canvas.getContext('2d');
    canvasDraw();
}, false);