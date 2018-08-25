# Memory Game Project  
 This is a complete browser based `card matching game` (also known as  **concentration** ).
 
 [Memory Game: Click To Play](https://nayaksofia.github.io/memory-game-udacity-sofia/)

## How the game works?
* The game board consists of `sixteen cards` arranged in a **grid**.
* The deck is made up of `eight different pairs of cards` , each with different symbols on one side.
* The cards are arranged `randomly on the grid` with the symbol face down.
### Game Play Rules:
* Flip over two hidden cards at a time to locate the ones that match.
### Each Turn:
* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with same symbol.
* If the card match, both cards stay flipped over.
* If the card do not match, both the cards are flipped face down.
* The game end once all cards have been correctly matched. 

## Game Behavior
### Memory Game Logic
> The game `randomly shuffles` the cards. A user wins once all cards have successfully been matched. 
### Congratulations Popup
> When a user wins the game, a modal appears to _congratulate_ the player and ask _if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was?_ 
### Restart Button
>  A _restart_ button allows the player to _reset the game board, the timer, and the star rating_.
### Star Rating
> The game displays a star rating _(from 1 to at least 3)_ that reflects the player's _performance_. At the beginning of a game, it should display at least 3 stars (but here i taken 5 stars). After some number of moves, It should change to a lower star rating. After few more moves, it should change to a even lower star rating (down to 1).

> The _number of moves_ needed to change the rating is up to you, but itt should happen at some point. 
### Timer
> When the player starts a game, `a displayed timer` should also start. Once the player wins the game , the timer stops. 
### Move Counter
> Game displays the `current number of moves` a user has made.

## Suggestions to add few more features 
* Add CSS Animation when cards are clicked, unsuccessfully matched and successfully matched.
* Add unique functionality beyond the minimum requirements(Implement a leaderboard, storegame state using local storage etc.)
* Implement additional optimization that improve the performance and user experience of the game (keyboard shortcuts for gameplay , etc).