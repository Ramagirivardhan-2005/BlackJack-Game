let form = document.querySelector("form");
let scoreBoard = document.querySelector(".ScoreBoard");
let next = document.querySelector(".Next");
let stop = document.querySelector(".Stop");
let restart = document.querySelector(".Restart");
let drop = document.querySelector(".add");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let lifeline = document.querySelector(".chance"); 
const winnerSound = document.getElementById('winnerSound');
const loserSound = document.getElementById('loserSound');
const messageBox = document.getElementById('messageBox');
let chance = 0;  
let maxDropChances = 5; 
let sum = 0;
let cardnumber = 0;
let cardValuesArray = []; 
const cardValues = {
    'A': 11,
    'J': 10,
    'Q': 10,
    'K': 10,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10
};
const arr = ['A', 'J', 'Q', 'K', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const img = ['A.png', 'j.jpeg', 'Q.jpeg', 'K.png', '2.jpg', '3.png', '4.jpg', '5.jpeg', '6.jpg', '7.png', '8.jpeg', '9.png', '10.jpeg'];

function generateCard() {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function updateScoreBoard(message) {
    scoreBoard.innerHTML = message;
}

function updateButtonVisibility() {
    if (sum === 21) {
        next.classList.add('hidden');
        stop.classList.add('hidden');
        drop.classList.add('hidden');
        restart.classList.remove('hidden');
    } else if (sum > 21) {
        next.classList.add('hidden');
        stop.classList.add('hidden');
        restart.classList.remove('hidden');
        drop.classList.remove('hidden');
    } else if (sum >= 19) {
        restart.classList.add('hidden');
        drop.classList.remove('hidden');
        next.classList.remove('hidden');
        stop.classList.remove('hidden');
        
    } else {
        updateScoreBoard(`You Are Below 19, Keep Going! Sum Of Your Cards Is ${sum}`);
    }
}

function handleGameOver() {
    if (sum === 21) {
        updateScoreBoard('Hero of the Match 😎😎\nTotal Value Of Your Cards Is Exactly 21..');
        form.style.backgroundColor = 'green';
        messageBox.style.backgroundColor='green';
        showMessage("Hero of the Match 😎😎");
        winnerSound.play();
    } else if (sum > 21) {
        updateScoreBoard(`Better Luck Next Time\nYour Total Value Of Your Cards Is Greater Than 21...😔😔\nSum Of Your Cards Is ${sum}`);
        form.style.backgroundColor = 'red';
        loserSound.currentTime=0;
        loserSound.play();
    } else if (sum < 21 && sum >= 19) {
        updateScoreBoard(`Very Smart Play, You Are Around The Max Score.. Good Luck For Next Play 😃😃\nSum Of Your Cards Is ${sum}`);
    }
    updateButtonVisibility();
    lifeline.innerHTML = `Total Chances: ${maxDropChances - chance}`; 
}

function resetGame() {
    sum = 0;
    cardnumber = 0;
    chance = 0; 
    cardValuesArray = []; 
    form.style.backgroundColor = '#fff';
    [one, two, three, four, five, six].forEach(element => {
        element.style.backgroundImage = ''; 
        element.style.display = 'none'; 
    });
    lifeline.innerHTML = `Total Chances: ${maxDropChances}`; 
}

function initial() {
    for (let i = 0; i < 3; i++) {
        let card = generateCard();
        let cardValue = cardValues[card];
        sum += cardValue;
        cardValuesArray.push(cardValue); 
        let cardIndex = arr.indexOf(card);
        if (cardnumber === 0) {
            one.style.backgroundImage = `url(${img[cardIndex]})`;
            one.style.display = 'block';
        } else if (cardnumber === 1) {
            two.style.backgroundImage = `url(${img[cardIndex]})`;
            two.style.display = 'block'; 
        } else if (cardnumber === 2) {
            three.style.backgroundImage = `url(${img[cardIndex]})`;
            three.style.display = 'block'; 
        }
        cardnumber++;
    }
    updateScoreBoard(`The Total Value Of Your Cards Is ${sum}`);
    handleGameOver();
}

function playgame() {
    stop.addEventListener("click", function (event) {
        event.preventDefault(); 
        let confirmRestart = confirm("Are you going to start the game again?");
        if (confirmRestart) {
            resetGame();
            initial(); 
        }
    });

    drop.addEventListener("click", function (event) {
        event.preventDefault(); 
        form.style.backgroundColor = '';
        if (chance < maxDropChances) {
            if (cardValuesArray.length > 0) {
                let lastCardValue = cardValuesArray.pop();
                sum -= lastCardValue;
                switch (cardnumber) {
                    case 6:
                        six.style.backgroundImage = ''; 
                        six.style.display = 'none'; 
                        break;
                    case 5:
                        five.style.backgroundImage = ''; 
                        five.style.display = 'none'; 
                        break;
                    case 4:
                        four.style.backgroundImage = ''; 
                        four.style.display = 'none'; 
                        break;
                    case 3:
                        three.style.backgroundImage = ''; 
                        three.style.display = 'none'; 
                        break;
                    case 2:
                        two.style.backgroundImage = ''; 
                        two.style.display = 'none'; 
                        break;
                    case 1:
                        one.style.backgroundImage = ''; 
                        one.style.display = 'none'; 
                        break;
                }
                cardnumber--;
                chance++;
                next.classList.remove('hidden');
            } else {
                showMessage("No cards to drop.");
                drop.classList.add('hidden');
            }
        } else {
            showMessage("You have used all your drop chances.");
            next.classList.add('hidden');
        }
        handleGameOver();
        drop.classList.add('hidden');
    });

    next.addEventListener("click", function (event) {
        event.preventDefault(); 
        if(chance===4){
            drop.classList.add('hidden');
        }
        else{
            drop.classList.remove('hidden');
        }
        if (cardnumber <= 5) {
            let card = generateCard();
            let cardValue = cardValues[card];
            sum += cardValue;
            cardValuesArray.push(cardValue); 
            let cardIndex = arr.indexOf(card);
            if (cardnumber === 0) {
                one.style.backgroundImage = `url(${img[cardIndex]})`;
                one.style.backgroundSize = 'none';
                one.style.display = 'block';
            } else if (cardnumber === 1) {
                two.style.backgroundImage = `url(${img[cardIndex]})`;
                two.style.display = 'block'; 
                two.style.backgroundSize = 'none';
            } else if (cardnumber === 2) {
                three.style.backgroundImage = `url(${img[cardIndex]})`;
                three.style.display = 'block'; 
                three.style.backgroundSize = 'none';
            } else if (cardnumber === 3) {
                four.style.backgroundImage = `url(${img[cardIndex]})`;
                four.style.display = 'block'; 
                four.style.backgroundSize = 'none';
            } else if (cardnumber === 4) {
                five.style.backgroundImage = `url(${img[cardIndex]})`;
                five.style.display = 'block'; 
                five.style.backgroundSize = 'none';
            } else if (cardnumber === 5) {
                six.style.backgroundImage = `url(${img[cardIndex]})`;
                six.style.display = 'block'; 
                six.style.backgroundSize = 'none';
            }
            cardnumber++;
            updateScoreBoard(`The Total Value Of Your Cards Is ${sum}`);
            handleGameOver();
        } else {
            showMessage("Maximum number of cards reached.");
        }
    });

    restart.addEventListener("click", function () {
        resetGame();
    });
}
function showMessage(message) {
    
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    document.body.classList.add('disabled'); 

    setTimeout(() => {
        messageBox.style.display = 'none';
        document.body.classList.remove('disabled'); 
    }, 2000); 
}
document.addEventListener("DOMContentLoaded", function() {
    next.classList.add('hidden');
    stop.classList.add('hidden');
    restart.classList.add('hidden');
    scoreBoard.classList.add('hidden');
    drop.classList.add('hidden');
    lifeline.classList.add('hidden'); 
    
    let start = document.querySelector(".Start");
    start.addEventListener("click", function(event){
        event.preventDefault(); 
        start.style.display = 'none';
        scoreBoard.classList.remove('hidden');
        drop.classList.remove('hidden');
        next.classList.remove('hidden');
        stop.classList.remove('hidden');
        restart.classList.remove('hidden');
        lifeline.classList.remove('hidden'); 
        initial();
        playgame();
        lifeline.style.backgroundColor='grey';
        lifeline.style.boxShadow = '3px 3px 3px gold';
    });
});
