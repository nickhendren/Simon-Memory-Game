$(function(){
    var panels = document.querySelectorAll(".game-pieces");
    console.log(panels);

    // getRandom randomly selects a number inbetween 1 and 4. 1, 2, 3, & 4 are each assigned to a different game piece.
    function getRandom() {
        return Math.floor((Math.random() * 4) + 1)
    }
    getRandom();

    // getRound rounds getRandom to a whole integer
    function getNumber() {
        return Math.round(getRandom());
    }
    getNumber();

    var Simon = {
    	sequence: [], //this is an open array where the numbers randomly selected by the computer will be stored
    	player1copy: [], //this is where player 1's answers will be stored
        player2copy: [], //this is where player 2's answers will be stored
    	round: 0, //number of rounds played
    	active: true, //if active is true the game will continue to be played

        startGame: function() {
    		this.sequence = [];
    		this.player1copy = [];
            this.player2copy = [];
    		this.round = 0;
    		this.active = true;
    		this.newRound();
    	}, //this refers to var Simon

        //newRound will pick a random number that correlates with a specific panel and stores it in sequence[]. It will also record what player 1 and player 2 choose and overwrite their previous answers
        newRound: function() {
    		$('[data-round]').text(++this.round);
    		this.sequence.push(getNumber());
    		this.player1copy = this.sequence.slice(0);
            this.sequence.push(getNumber());
    		this.player2copy = this.sequence.slice(0);
    		$(this).animate(this.sequence);
    	},

        //registerClick1 will check to see if player 1's answer is the same one as the one that the computer generated
        registerClick1: function(click1) {
    		var desiredResponse = this.player1copy.shift();
    		var actualResponse = $(click1.target).data('tile');
    		this.active = (desiredResponse === actualResponse);
    	},

        //registerClick2 will check to see if player 2's answer is the same one as the one that the computer generated
        registerClick2: function(click2) {
        	var desiredResponse = this.player2copy.shift();
        	var actualResponse = $(click2.target).data('tile');
        	this.active = (desiredResponse === actualResponse);
        },
    }
    Simon.startGame();
    Simon.newRound();
})
