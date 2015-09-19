/* 	Author: Wei Gao
	Date: 9/17/2015
	This program is written in jQuery to give a grammer quiz to the users 
    In addition, it also uses OOP in Javascript, multiple quizs are created as objects with properties and a single method.
    bootstrap css has also been used in the code.
*/	
$(document).ready(function(){
	//define varaibles here
	var questions = [];
	var quizs = [];
	var questionChoices = [];
	var quizresult = "";
	questions[0] = "Many people have devised methods ___ they have measured time";
	questionChoices[0] = ["which", "when", "with which", "in which", "where"];
	questions[1] = "An archaeologist has found an ancient Egyptian town in Isreal ___ discovery suggests that Egyptian influence was wider than previously believed.";
	questionChoices[1] = ["who", "to whom", "where", "whose", "in which"];
	questions[2] = "The suburbs are the places ___ many Americans moved to in the 1950s in the USA.";
	questionChoices[2] = ["which", "where", "in which", "of which", "whose"];
	questions[3] = "Scientists are doing research on remote ecosystems, ___ is the Arctic tundra.";
	questionChoices[3] = ["which", "that", "through which", "each of them", "one of which"];
	questions[4] = "Many people have devised methods ___ they have measured time.";
	questionChoices[4] = ["that observed", "which are observing", "being observed", "having observed", "whom observed"];
	var answers = [3, 4, 1, 2, 4];
	var selections = ["", "", "", "", ""];
	var scores = [0, 0, 0 , 0, 0];
	var response = ["", "", "", "", ""]; 
	//create five quiz objects with properties and a method.
	for (var i = 0; i< answers.length; i++) {
		quizs[i] = new Quiz(questions[i], i + 1, questionChoices[i], selections[i], scores[i], answers[i], response[i]);
	}
	
	// After a user clicks on the "Get Started" button, he/she sees the first quiz question
	$(".buttonZero").on("click", function(e) {
		e.stopPropagation();
		$(this).fadeOut("slow");
		$(".holdplace").siblings().hide();
		addQuiz(quizs[0]);
	});

	//The user picks an answer and click the "Submit the Question" button to sumbit the answer.
	$(".buttonOne").on("click", $(".buttons"), function(e) {
		e.stopPropagation();
		var idval = $(".buttons").attr("id");
		var radiochecked = $(":radio:checked").val();
		if (radiochecked == undefined) {
			if (!($(".holdplace").has(".text-warning").length)){
				$(".holdplace").append("<div class='row'><div class='text-warning'>Please pick an answer before press the button.</div></div>");
			}
		}
		else {
			quizs[idval - 1].selection = radiochecked;
			var buttons1 = "<button type='button' class='btn btn-primary anoButtons' data-num='" + idval + "'>Next Question</button>";
			var buttonRes = "<buttonif type='button' class='btn btn-success resButton'>Your Result</button>";
			$(".buttons").remove();
			$(".text-warning").remove();
			$(":radio").attr("disabled", true);
			var p = checkQuestion(quizs[idval - 1]);
			$(".holdplace").append("<div class='row'><p class='text-success col-xs-12'>" + p.response + "</p></div>");
			if(quizs.length == idval) {
				$(".resultBu").append(buttonRes);
			}
			else
				$(".buttonTwo").append(buttons1);
		}	
	});
	
	// The user get the feedback on if he/she selected a correct answer, and can proceed to the next question by clicking the "Next Question" button.
	$(".buttonTwo").on("click", $(".anoButtons"), function(e) {
		e.stopPropagation();
		var dataval = $(".anoButtons").data("num");
		emptyContents();
		addQuiz(quizs[dataval]);
	});

	//At the end of the quiz, if the user clicks the "Your Result" button, he/she will see the score of his/her quiz.
	$(".resultBu").on("click", $(".resButton"), function(e) {
		e.stopPropagation();
		var showQuizre = "<h1>The Result of your Quiz</h1>";
		var restartBu = "<button type='button' class='btn btn-primary restartBut text-center'>Retake the Quiz</button>";
		showQuizre += getResult(quizs);
		emptyContents();
		$(".resultBu").addClass("text-success text-center form-default").append(showQuizre);
		$(".restartButton").append(restartBu);
	});

	//The user can procceed to take the quiz again by clicking the "Retake the Quiz" button.
	$(".restartButton").on("click", $(".restartBut"), function(e) {
		e.stopPropagation();
		emptyContents();
		$(".holdplace").siblings().show();
		$(".buttonZero").fadeIn("slow");
	});		
		
	// Create a Quiz "Class" with properties and a method.
	function Quiz(question, questionnum, choices, selection, score, correctnum, response) {
		this.question = question;
		this.questionnum = questionnum;
		this.choices = [];
		this.choices[0] = choices[0];
		this.choices[1] = choices[1];
		this.choices[2] = choices[2];
		this.choices[3] = choices[3];
		this.choices[4] = choices[4];
		this.selection = selection;
		this.score = score;
		this.response = response;
		var	answer = choices[correctnum];
		this.getanswer = function(){
			return answer;
		}
	}

	//This function is used to add a quiz here by calling two functions to add a quiz question and multiple choices for this question.
	function addQuiz(p) {
		var questionPar = "<div class ='row'>" + addQuestion(p);
		var questionCho = questionPar + addChoices(p) + "</div>";
		$(".holdplace").prepend(questionCho);
	}
    
    //This function is used to add the quiz questions. 
	function addQuestion(p) {
		var s1 = "<h2 class='col-xs-12 text-left'>" + p.questionnum + " . " + p.question + "</h2>";
		return s1;
	}

	//This function is used to add the multiple choices.
	function addChoices(p){
		var choice = "";
		var p2 = p.choices;
		var num1 = p.questionnum;
		for (var i = 0; i < p2.length; i++) {
			choice = choice + "<div class='form-group'><input type='radio' value='" + (i+1) + "' class='col-xs-1' name='choice" + num1 + "' id='choice" + num1 + i + "'> <label class='col-xs-11 label1 text-left' for='choice" + num1 + i + "'>" + p2[i] + "</label></div>";
		}
		var buttonsub = "<button type='button' class='btn btn-info buttons' id='" + num1 +"'>Submit your answer</button>";
		$(".buttonOne").append(buttonsub);
		return choice;
	}
	
	//It checks the selection the user made with the answer.
	function checkQuestion(p) {
		if(p.choices[p.selection] == p.getanswer()) {
			p.score = 1;
			p.response = "Your answer is correct";
		}
		else { 
			p.score = 0;
			p.response = "Your answer is incorrect";
		}
		return p;
	} 

	//It provides the final score for the user.
	function getResult(a1) {
		var scorenow = 0;
		var percent = 0;
		for (var i = 0; i < a1.length; i++) {
			a1[i] = checkQuestion(a1[i]);
			scorenow += a1[i].score;
		}
		percent = scorenow * 20;
		return "<p class='text-success'>Your score is " + scorenow + " out of 5, " + percent + "%</p>";  
	}

	//It deletes the unused contents such as a button, etc.
	function emptyContents(){
		$(".holdplace").children().each(function(){
			if($(this).hasClass("row1")){
				$(this).children().empty();
			}
			else
				$(this).remove();
		});
	}
	
})