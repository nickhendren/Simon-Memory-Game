<<<<<<< HEAD
var Simon = {
=======
    var Simon = {
>>>>>>> 99a7299c44974ad97d935e0a0779302ae24376a8
    	sequence: [], //this is an open array where the numbers randomly selected by the computer will be stored
    	player1copy: [], //this is where player 1's answers will be stored
        player2copy: [], //this is where player 2's answers will be stored
    	round: 0, //number of rounds played
        turn: 0,
    	active: false, //if active is true the game will continue to be played
        handler: false,
        player1: {
            name: "Player 1",
            score: 0
        },
        player2: {
            name: "Player2",
            score: 0
        },

        init: function() {	//initialises the game
    		if(this.handler === false) { //checks to see if handlers are already active
    			this.initPadHandler();	//if not activate them
    		}
    		this.newGame();	//reset the game defaults
    	},

        initPadHandler: function(){
    		var that = this; //that refers to the Simon object
    		$(".game-pieces").on("click", function() {
    			if(that.active === true) {
    				var pad = parseInt($(this).data("pad"), 10);
    				that.flash($(this), 1, 300, pad);
    				that.logPlayerSequence(pad);
    			}
    		});
    		this.handler=true;
    	},

        newGame: function() { //resets the game and generates a starts a new level
    		this.round = 1;
    		this.player1.score = 0;
            this.player2.score = 0;
    		this.newLevel();
    		this.displayRound();
    		this.displayScore();
    	},

        newLevel: function() {
    		this.sequence.length = 0;
    		this.player1copy.length = 0;
            this.player2copy.length = 0;
    		this.pos=0;
    		this.turn=0;
    		this.active = true;
    		this.startGame(this.round); //randomize pad with the correct amount of numbers for this level
    		this.displaySequence(); //show the user the sequence
    	},

        flash: function(element, times, speed, pad) { //function to make the pads appear to flash
    		var that = this;  //cache this
    		if (times > 0) { //make sure we are supposed to flash
    			element.stop().animate({opacity: '1'}, { //animate the element to appear to flash
    				duration: 50,
    				complete: function(){
    				element.stop().animate({opacity: '0.6'}, 200);
    				}
    			});	//end animation

				times -= 1;	//times - 1 for each time it's called
				setTimeout(function() {
    				that.flash(element, times, speed, pad);
    			}, speed);
    		}
    	},

        startGame: function() {
    		this.sequence = [];
            for (var i = 0; i < 4; i++) {
                var random = Math.floor((Math.random() * 4) + 1);
                Simon.sequence.push(random);
                console.log(random);
            }

    		// this.player1copy = [];
            // this.player2copy = [];
    		// this.round = 0;
    		// this.active = true;
    		// this.newRound();
    	}, //this refers to var Simon

        logPlayerSequence: function(pad) { //log the player selected pad to user array and call the checker function
            this.player1copy.push(pad);
            this.player1copy.push(pad);
            this.checkSequence(pad);
        },

        checkSequence: function(pad) { //checker function to test if the pad the user pressed was next in the sequence
            var that = this;
            if(pad !== this.sequence[this.turn]){ //if not correct
                this.incorrectSequence();
                } else{ //if correct
                    this.keepScore(); //update the score
                    this.turn++; //incrememnt the turn
                }

            if(this.turn === this.sequence.length){	//if completed the whole sequence
                this.round++; //increment level, display it, disable the pads wait 1 second and then reset the game
                this.displayRound();
                this.active = false;
                setTimeout(function() {
                    that.newLevel();
                }, 1000);
            }
        },

        displaySequence: function() { //display the generated sequence to the user
            var that = this;
			console.log("from displaySequence");
			console.log("this.sequence is", this.sequence);

            $.each(this.sequence, function(index, val) { //iterate over each value in the generated array
				console.log(val);
				setTimeout(function() {
                    that.flash($('.' + val), 1, 300, val);
                }, 500 * index); // multiply timeout by how many items in the array so that they play sequentially and multiply by the difficulty modifier
            });
        },

        displayRound: function(){ //just display the current level on screen
    		$('#player1 h3').text('Round: '+ this.round);
            $('#player2 h3').text('Round: '+ this.round);
    	},

    	displayScore: function(){ //display current score on screen
    		$('#player1 h3').text('Score: '+ this.player1.score);
            $('#player2 h3').text('Score: '+ this.player2.score);
    	},

        keepScore: function() {	//keep the score
    		var multiplier = 0;
            this.player1score += (1 * multiplier);	//work out the score
            this.player2score += (1 * multiplier);
    		this.displayScore(); //display score on screen
    	},

        incorrectSequence: function() {	//if user makes a mistake
    		var correctPad = this.sequence[this.turn], //cache the pad number that should have been pressed
    			that = this;
    			this.active = false;
    			this.displayRound();
    			this.displayScore();
    		setTimeout(function() {	//flash the pad 4 times that should have been pressed
    			that.flash($(that.shape+correctPad), 4, 300, correctPad);
    		},500);
    		$('.start').show();	//enable the start button again and allow difficulty selection again
    		$('.difficulty').show();
    	}

    };

    $(document).ready(function() {//document ready
    	$(".start").on("click", function() { //initialise a game when the start button is clicked
    		$(this).hide();
    		Simon.init();
    	});
    });
