/*
* Create a list that holds all of the cards
*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Creating a list that holds all of the cards
let cardList = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'],
 
//Declaring variable in jQuery
$container = $('.container'),
$scorePanel = $('.score-panel'),
$rating = $('.fa-star'),
$moves = $('.moves'),
$timer = $('.timer'),
$restart = $('.restart'),
$deck = $('.deck'),

//set the variable 
thisTime,
openCards = [],
match = 0,
second = 0,
moves = 0,
wait = 620,
totalCard = cardList.length / 2,

//scoring for 1 to 5 stars
stars5 = 12,
stars4 = 14,
stars3 = 18,
stars2 = 20,
star1 = 25;

// Shuffle function from http://stackoverflow.com/a/2450976 , known as Fisher-Yates (aka Knuth) Shuffle. With this function, we should be able to shuffle our cards on the game board:
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 // The function gameStart() starts the game 
function gameStart() {

    // The shuffle function shuffles the cards array
    let cards = shuffle(cardList);
    $deck.empty();

    // With no matching cards and zero moves, Game Start
    match = 0;
    moves = 0;
    $moves.text('0');

    // A for loop creates 16  <li> tags with the class of card for every <i> tag
    // And a class of fa fa- and a name of each card from the cardList=[] array
    for (let i = 0; i < cards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
    }
    addCardListener();

    // Enables the timer to reset to 0 when the game is restarted
    resetTimer(thisTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

// Adds a score from 1 to 3 stars depending on the amount of moves done
function rating(moves) {

    let rating = 5;
    if (moves > stars5 && moves < stars4) {
        $rating.eq(5).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars4 && moves < stars3) {
        $rating.eq(4).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars3 && moves <stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves <star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { 
        score: rating
     };
}

// Add boostrap modal alert window showing time, moves, score required to finish the game, when all pairs are matched toggle.
function gameOver(moves, score) {
    $('#myText').text(`Time: ${second} Seconds, Your Move: ${moves} Moves, Total Score: ${score}, Well done!!!`);
    // $('#myModal').toggle();  
    $('#myModal').modal('show');  
}

// Clicking on the reset icon
$restart.on('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        gameStart();
    }
});

//function for successful match between two cards and it's remain open
// If cards do not match, then both cards are flipped back.
let addCardListener = function () {

    // card that is clicked on is flipped
    $deck.find('.card').on('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { 
            
            return true; 
        }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        openCards.push(card);

        // Compares cards if they matched
        if (openCards.length > 1) {
            if (card === openCards[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                // If cards are not matched, there is a delay of few miliseconds, and the cards will turn back cover up.
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 2.00);
            }

            // The open cards array specifies all added cards facing up
            openCards = [];

            // Increments the number of moves, one only when two cards are matched or  unmatched
            moves++;

            // The number of moves is added to the rating() function that will determine the star score
            rating(moves);

            // The number of moves are added to the modal HTML alert
            $moves.html(moves);
        }

       // Game Over after all cards have been matched, with a short delay
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            },800);
        }
    });
}

// Initiates the timer as soon as the game is loaded
function initTime() {
    thisTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}
gameStart();

