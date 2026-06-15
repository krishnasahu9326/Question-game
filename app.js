const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");

let storedAnswer;
let score = 0;

const randomNumber = (min,max) =>{
    return Math.floor(Math.random()*(max-min+1)+min);
};

const generateQuestion = () =>{
    const randomNumber1 = randomNumber(1,10);
    const randomNumber2 = randomNumber(1,15);
    const questionType = randomNumber(1,4);
    let firstN;
    let secondN;

    if(randomNumber1>=randomNumber2 && questionType>2){
        firstN = randomNumber1;
        secondN = randomNumber2;
    }else{
        firstN = randomNumber2;
        secondN = randomNumber1;
    }
    switch(questionType){

        case 1:
            question = `Q. What is ${firstN} multiply by ${secondN} ?`;
            answer = firstN* secondN;
            break;
        case 2:
            question = `Q. What is ${firstN} add ${secondN} ?`;
            answer = firstN+ secondN;
            break;

        case 3:
            question = `Q. What is ${secondN} subtract from ${firstN} ?`;
            answer = firstN-secondN;
            break;

        case 4:
            question = `Q. What is ${firstN} modulo ${secondN} ?`;
            answer = firstN % secondN;
            break;

    }
    return {question,answer};
};

const showQuestion = ()=>{
    const {question,answer} = generateQuestion();
    questionEl.innerText = question;
    storedAnswer = answer;
}
showQuestion();

const checkAnswer = (event) =>{
    event.preventDefault();
    const formData = new FormData(questionFormEl);
    
    const userAnswer = parseInt(formData.get("answer"));
    
    
    if(userAnswer ==storedAnswer){
        score++;
        Toastify({
            text:"Answer is correct",
            gravity:"bottom",
            position:"center",
            style:{
                background: "linear-gradient(to right,#00b09b,#96c93d)",
            },
        }).showToast();
    }else{
        score = Math.max(0,score-1);
        Toastify({
            text:"Answer is incorrect",
            gravity:"bottom",
            position:"center",
            style:{
                background: "linear-gradient(to right,#e33217,#ff001e)",
            },
        }).showToast();
    }
    scoreEl.innerText = score;
    event.target.reset();
    showQuestion();

};
