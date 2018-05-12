var questionList = [
        {question: "What is the name of Reinhard von Lohengramm's warship?",
        answers:["Brunhild", "Barbarossa", "Ulysses", "Tristan"],
        correctAnswer: 0
        },
        {question: "Which of the listed was not one of the three main parties in the story",
        answers:["Galactic Empire", "Free Planets Alliance", "Iserlohn", "Phezzan"],
        correctAnswer: 2
        },
        {question: "On which year by Universal Calendar did Reinhard von Lohengramm overthrow the old Goldenbaum Dynasty?",
        answers:["UC798", "UC799", "UC800", "UC801"],
        correctAnswer: 1
        },
        {question: "Which two were called 'The Twin Pillar' of the Empire?",
        answers:["Mittermeyer and Reuenthal", "Bittenfield and Oberstein", "Lutz and Muller", "Lohengramm and Kircheis"],
        correctAnswer: 0
        },
        {question: "What was the rank of Walter von Schonkopf at the time Yang invited Rosen Ritter into his Fleet?",
        answers:["Lieutenant Colonel", "Vice Commander","Commander", "Vice Admiral", ],
        correctAnswer: 2
        },
        {question: "Which was the last battle between the New Empire and Iserlohn Republic?",
        answers:["The Battle of the Corridor", "The Battle of Shiva", "The Second Battle of Rantemario", "The Second Battle of Iserlohn"],
        correctAnswer: 1
        },
        {question: "In which year did Tanaka Yoshiki start publishing the novel of Legend of the Galactic Heroes?",
        answers:["1989", "1985", "1982", "1987"],
        correctAnswer: 2
        },
    ];

var correctCount, incorrectCount, 
    currentQuestion,
    seconds, timer, 
    ifAnwswered,
    select, ans;


$("#questionContent").hide();
$("#messageContent").hide();
$("#resultsContent").hide();

$("#start").on("click", function() {
    $(this).hide();
    newGame();
});

$("#restart").on("click", function() {
    $(this).hide();
    newGame();
});

function newGame() {

    $("#questionContent").show();
    $("#messageContent").hide();
    $("#resultsContent").hide();    

    $("#currentSecond").text("30");
    $("#questionShow").empty();
    $("#answersShow").empty();
    $("#message").empty();
    $("#correctAnswerShow").empty();
    $("#totalCorrectCount").empty();
    $("#totalWrongCount").empty();

    correctCount = 0;
    incorrectCount = 0;
    currentQuestion = 0;
    ifAnwswered = false;
    select = null;
    ans = null;

    playGame();

};//end of function newGame//


function playGame() {
    if(currentQuestion == questionList.length) {
        $("#totalCorrectCount").text(correctCount);
        $("#totalWrongCount").text(incorrectCount);
        $("#questionContent").hide();
        $("#timer").hide();
        $("#messageContent").hide();
        $("#resultsContent").show();
        $("#restart").show();
    } else {

    $("#questionContent").show();
    $("#timer").show();
    $("#messageContent").hide();

    $("#questionShow").text(questionList[currentQuestion].question);
    for (j=0; j<4; j++) {
        var option = $('<div class="answerOption content-style3">');
        option.attr("index", j);
        option.text(questionList[currentQuestion].answers[j]);
        $("#answersShow").append(option);
    };
    countDown();
    
    $(".answerOption").on("click", function() {
        select = $(this).attr("index");
        ans = questionList[currentQuestion].correctAnswer;

        ifAnwswered = true;
        clearInterval(timer);
        showAnswer();
    })

    }
} //end of function playGame//

function countDown() {
    seconds = 30;
    clearInterval(timer);
    timer = setInterval(decrement, 1000);
}

function decrement() {
    seconds--;
    $("#currentSecond").text(" " + seconds);
    if(seconds <1) {
        ifAnwswered = false;
        clearInterval(timer);
        showAnswer();
    }
}
    

function showAnswer() {
    $("#questionContent").hide();
    $("#messageContent").show();

    if (ifAnwswered === true) {
        if (ans == select) {
            $("#message").text("You Got the Correct Answer!");
            $("#correctAnswerShow").hide();
            correctCount++;
            
        }
        else if(ans !== select) {
            $("#message").text("You Didn't get the Correct Answer :(");
            $("#correctAnswerShow").text("The Correct Answer is: " + questionList[currentQuestion].answers[questionList[currentQuestion].correctAnswer]);
            $("#correctAnswerShow").show();
            incorrectCount++;
        };
    } else if(ifAnwswered === false && seconds < 1) {
        $("#message").text("Time is Up!");
        $("#correctAnswerShow").text("The Correct Answer is: " + questionList[currentQuestion].answers[questionList[currentQuestion].correctAnswer]);;
        incorrectCount++;
    };
    currentQuestion++;
    $("#currentSecond").text("30");
    $("#questionShow").empty();
    $("#answersShow").empty();

    select = null;
    ans = null;
    ifAnwswered = false;
    
    clearInterval(timer);

    setTimeout(function() {
        $("#message").empty();
        playGame();
    }, 2200);
    
}


