var panels = document.querySelectorAll(".game-pieces");
console.log(panels);

// getRandom randomly selects a number inbetween 1 and 4. 1, 2, 3, & 4 are each assigned to a different game piece.
function getRandom() {
    return Math.floor((Math.random() * 4) + 1)
}
getRandom();

// getRound rounds getRandom to a whole integer
function getRound() {
    return Math.round(getRandom());
}
getRound();
