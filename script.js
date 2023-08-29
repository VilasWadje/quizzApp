
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        var questions = JSON.parse(this.responseText);
        console.log(questions);

        var quizz = document.getElementById("quizz");
        var idnum = 1;

        var quizzform = document.createElement("form");
        quizzform.className = "quizzform";
        for (var i = 0; i < questions.length; i++) {
            //create div


            //create and append question
            var question = document.createElement("p");
            question.className = "question";
            question.innerText = `Q${i + 1}.${questions[i].question}`
            quizzform.appendChild(question);

            //create and append options
            for (var j = 0; j < questions[i].options.length; j++) {
                //create radio button

                var radioButton = document.createElement("input");
                radioButton.id = `btn${idnum}`;//adding id to radio button input field
                radioButton.setAttribute("type", "radio");
                radioButton.setAttribute("name", `${i + 1}`);//for only one check ame should be same for aal options or radio btns
                radioButton.setAttribute("value", j + 1);//for checking ans

                //creating label
                var optionLabel = document.createElement("label")
                optionLabel.innerText = `${questions[i].options[j]}`;
                optionLabel.setAttribute("for", `btn${idnum}`);

                quizzform.appendChild(radioButton);
                quizzform.appendChild(optionLabel);
                idnum++;

                var br = document.createElement("br");
                quizzform.appendChild(br);
            }

            var hr = document.createElement("hr");
            quizzform.appendChild(hr);


        }
        //create and append submit button
        var btn = document.createElement("button");
        btn.className = "submitBtn";
        btn.innerText = "Submit";
        btn.setAttribute("type", "submit");
        quizzform.appendChild(btn);

        //append form
        quizz.appendChild(quizzform);

        btn.addEventListener("click", function (e) {
            var score = 0;
            e.preventDefault();
            // console.log("hii");
            var solvedQuestion = document.querySelectorAll("input:checked");//which questions are checked
            // console.log(solvedQuestion[0].name);
            for (let k = 0; k < solvedQuestion.length; k++) {
                let questionNo = solvedQuestion[k].name;
                let selectedAns = solvedQuestion[k].value;

                let actualAns = questions[questionNo - 1].answer;

                if (selectedAns == actualAns) {
                    score++;
                }
            }
            console.log(score)
            //displaying score
            document.getElementById("score").innerText=score;
        })

    }

}

xhttp.send();

