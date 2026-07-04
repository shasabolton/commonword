# commonword
make this game with vanila js, client side only.
A game where you must give clues by finding a common word that links images
A grid of 5x5 emojis is generated randomly.

emojies =[
 {
   symbol: ❤️, 
   points:1,
   selected: false
 }
]
One of them is assigned as instant game over.
Half of the remaining are 1 points each.
The rest are 0 points 
The player does not know which are which.
toggling a reveal button, marks all the points under the emojies.
Pressing an emojie puts a border around it and makes its points
always revealed. it also adds the points to a total.
one player will press reveal and make a clue for the other
player. the clue links miltiple words. they then
toggle off reveal and let the guesser choose using the spoken
clue.


