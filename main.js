var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = ['apple', 'grape', 'banana', 'pineapple', 'watermelon', 'orange']
$(function(){
	// click on start reset buttton
	$("#startreset").click(function(){
		// we are playing
		if(playing == true){

			// reload the page
			location.reload();
		}else{
			//we are not playing
			playing = true;
			// set score to 0
			score = 0;
			$("#scorevalue").html(score);

			// show trials left
			$("#trialsleft").show();
			trialsleft = 3;
			addHearts();

			// hide game over box
			$("#gameOver").hide()

			// Change button text to text game
			$("#startreset").html("Reset Game")
			startAction();
		}
	});


$("#fruit1").mouseover(function(){
	score++;
	$("#scorevalue").html(score);
	$("#slicesound")[0].play();
	clearInterval(action);

	// slice fruit
	$("#fruit1").hide("explode", 500)

	setTimeout(startAction, 800);
})

function addHearts(){
	$("#trialsleft").empty();
	for(i = 0; i < trialsleft; i++){
		$("#trialsleft").append('<img class="life" src="images/hearts.png">')
	}
}

function startAction(){
	$("#fruit1").show();
	chooseFruit();
	$("#fruit1").css({'left': Math.round(Math.random() * 550), 'top': -50})

	// generate a random step
	step = Math.round(Math.random() * 5) + 1;

	// mpve fruit down by one step every 10ms

	action = setInterval(function() {
		$("#fruit1").css('top', $("#fruit1").position().top + step)	
		// check if the fruit is too low
		if($("#fruit1").position().top > $("#fruitcontainer").height()){
			// check if we have any trials left
			if(trialsleft > 1){
				$("#fruit1").show();
				chooseFruit();
				$("#fruit1").css({'left': Math.round(Math.random() * 550), 'top': -50})
				// generate/change step

				step = Math.round(Math.random() * 5) + 1;

				trialsleft --;
				addHearts();

			} else{ // Game over
				playing = false;
				$("#startreset").html("Start Game")
				$("#gameOver").show()
				$("#gameOver").html('<p> Game Over !</p> <p>Your Score is ' + score + ' </p>')
				$("#trialsleft").hide()
				stopAction();
			}
		}
	}, 10);
}

function chooseFruit(){
	$("#fruit1").attr('src', 'images/' + fruits[Math.round(Math.random() * 5)] + '.png')
}

function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();
}
})