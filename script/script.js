let allQuestions = [ //these are all the questions
    {
        "step" : '1', //number
        "question": "How many colors are there in the Philippine flag?", //the question
        "choices": ["6", "9", "4", "7"], //choices
        "correctAnswer": 2 //correct answer
    },
    {
        "step" : '2',
        "question": "The Philippine General, Gregorio del Pilar, is much known as ______.",
        "choices": ["Gregorio", "Goyo", "Gogo", "Gogogo"],
        "correctAnswer": 1
    },
    {
        "step" : '3',
        "question": "Melchora Aquino, the mother of the revolution, is also known as ______.",
        "choices": ["Tandang Selos", "Ninoy Aquino", "Nanay ng Bansa", "Tandang Sora"],
        "correctAnswer": 3
    },
	{
        "step" : '4',
        "question": "How many faces are there found in front of the one-thousand peso bill?",
        "choices": ["1", "2", "3", "4"],
        "correctAnswer": 2
    },
	{
        "step" : '5',
        "question": "Who is the Philippine President found in the twenty peso bill or coin?",
        "choices": ["Manuel L. Quezon", "Manuel L. Quirino", "Elpidio L. Quezon", "Donald Trump"],
        "correctAnswer": 0
    },
	{
        "step" : '6',
        "question": "What is the nickname used by Dr. Jose Rizal?",
        "choices": ["Akopo Akopo", "Pepe", "Pipi", "J. Rizal"],
        "correctAnswer": 1
    },
	{
        "step" : '7',
        "question": "What is the longest bridge in the Philippines that connects the island of Leyte and Samar?",
        "choices": ["SLEX", "San Juanito Bridge", "San Juanico Bridge", "NLEX"],
        "correctAnswer": 2
    },
	{
        "step" : '8',
        "question": "Which Filipino hero is found in the 5-peso coin?",
        "choices": ["Undress Bonifacio", "Emilio Jacinto", "Emilio Aguinaldo", "Uhmmd ikopo alam"],
        "correctAnswer": 2
    },
	{
        "step" : '9',
        "question": "Who painted Spolarium?",
        "choices": ["Juan Luna", "Luna de San Juan", "Heneral Luna", "Juanito Lunatiko"],
        "correctAnswer": 0
    },
	{
        "step" : '10',
        "question": "This place found in manila and is also known as the walled city is called ______.",
        "choices": ["Intrams", "Intramuros", "Extras", "Extramuros"],
        "correctAnswer": 1
    },
	{
        "step" : '11',
        "question": "Jasminun Sambam is much also known as ______.",
        "choices": ["Sinasampaguita", "Sinampaguita", "Sasampaguita", "Sampaguita"],
        "correctAnswer": 3
    },
	{
        "step" : '12',
        "question": "Which place in Laguna was Dr. Jose Rizal born?",
        "choices": ["Calamba", "Kawit", "Metro Manila", "Awit"],
        "correctAnswer": 0
    },
	{
        "step" : '13',
        "question": "How many ships did Magellan use during his voyage that discovered the Philippines?",
        "choices": ["5", "4", "1", "None, he used an airplane."],
        "correctAnswer": 0
    },
	{
        "step" : '14',
        "question": "Apolinario Mabini drafted The Malolos Constitution. True or False?",
        "choices": ["True", "False", "Maybe","None of the Above"],
        "correctAnswer": 1
    },
	{
        "step" : '15',
        "question": "The first real battle fought between the FIlipinos and the Spaniards is known as ______.",
        "choices": ["Pugadlawin", "Pugad ng lawin", "Pugad ni Lawin", "None of the Above"],
        "correctAnswer": 3
    },
	{
        "step" : '16',
        "question": "Who was the founder of La Liga Filipana that is also the National Hero of the Philippines?",
        "choices": ["Jose Manalo", "Jose Bayola", "Jose Rizal", "Mark Villar"],
        "correctAnswer": 2
    },
	{
        "step" : '17',
        "question": "Andres Bonifacio started the KKK that later on became the president of the first republic in the Philippines. True or False?",
        "choices": ["True", "False", "Maybe","None of the Above"],
        "correctAnswer": 1
    },
	{
        "step" : '18',
        "question": "Bayang Magiliw is a composition of Juan Felipe that is now the Philippine National Anthem. True or False? ",
        "choices": ["True", "False", "Maybe","None of the Above"],
        "correctAnswer": 1
    },
	{
        "step" : '19',
        "question": "Noli Me Tangere is the first book that was published in the Philippines.",
        "choices": ["True", "False", "Maybe","None of the Above"],
        "correctAnswer": 1
    },
	{
        "step" : '20',
        "question": "Mariano Gomez, Jose Burgos, and Jacinto Zamora are famously known as ______.",
        "choices": ["MARJO", "HINDI", "MAJOHA", "GOMBURZA"],
        "correctAnswer": 3
    }
];

    

let leaderboardBtn = document.getElementById('leaderboard');
let loginBtn = document.getElementById('login');

async function quiz_proper() {
    let login = localStorage.getItem('login');
    let steps = [];
    let answers = [];
    let score = 0;

    allQuestions.forEach((question) => {
        steps.push(question['step']);
        answers.push(question['correctAnswer']);
    });

    const swalQueueStep = await Swal.mixin({
        confirmButtonText: 'Forward',
        cancelButtonText: 'Back',
        progressSteps: steps,
        customClass: 'swal-wide',
    });

    const values = [];
    let currentStep;

    for (currentStep = 0; currentStep < steps.length;) {
        var result = await swalQueueStep.fire({
            title: `Question for ${login}: `,
            text: allQuestions[currentStep]['question'],
            showCancelButton: currentStep > 0,
            currentProgressStep: currentStep,
            input: 'radio',
            inputOptions: {
                '0': allQuestions[currentStep]['choices'][0],
                '1': allQuestions[currentStep]['choices'][1],
                '2': allQuestions[currentStep]['choices'][2],
                '3': allQuestions[currentStep]['choices'][3],
            },
            inputAttributes: {
                required: true
            },
            reverseButtons: true,
            validationMessage: 'This field is required'

        })

        if (result.value) {
            //values[currentStep] = result.value;
            values[currentStep] = parseInt(result.value);
            currentStep++;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            currentStep--;
        } else {
            break;
        }
    }
        
    if (currentStep === steps.length) {
        for(let i = 0; i < answers.length; i++)
        {
            if(answers[i] === values[i])
            {
                score++;
            }
        }
        
        Swal.fire(
            {    
                title: `Quiz taking success!`,
                text: `Hi ${login}! Your score is ${score}/${answers.length}.`
            }
        )


    
        let board = JSON.parse(localStorage.getItem('leader'));
        
        const record = {
            name: login,
            score: score,
            total: answers.length,
        }
        
        board.push(record);
    
        board.sort(function (a, b) {
            return b.score - a.score;
        })

        localStorage.setItem('leader', JSON.stringify(board));
    
    
    
    }


}

loginBtn.onclick = function () {
    Swal.fire(
        {
            icon: 'info',
            title: `Let's Start!`,
            html: '<input type="text" id="login" style="margin : 0 auto;" class="swal2-input" placeholder="Username">',
            confirmButtonText: 'Start the quiz!',
            focusConfirm: false,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#login').value;
                if (!login) {
                    Swal.showValidationMessage(`Please enter username`)
                }
                localStorage.setItem('login', login);
                return { login: login }
            }

        }
    ).then((result) => { //callback functions
		if (result.value.login !== null) {
			quiz_proper();
		}
    })


}

leaderboardBtn.onclick = function () {
    let leader = JSON.parse(localStorage.getItem('leader'));
    let content = ''

    if (leader.length !== 0) {
        content += '<table class="hover">'
        content += '<thead> <tr> <th> Name </th> <th> Score </th> </tr></thead>'
        leader.forEach(element => {
            content += '<tr>';
            content += '<td>';
            content += element.name;
            content += '</td>';
            content += '<td>';
            content += element.score;
            content += '</td>';
            content += '</tr>';
        });
    }

    content += '</table>'
    if (leader.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No one has tried the quiz yet...',
            
        })
    }
    else {
        Swal.fire(
            {
                title: 'Leaderboard',
                html: content
            }
        );
    }
}

document.querySelector('body').onload = function () {
    /** once the page has finished loading */

    if (localStorage.getItem('leader') === null) {
        //set the empty leaderboard
        // dummy records dont mind this
        /*
        const record1 = {
            name: "Person 1",
            score: 5
        }
        const record2 = {
            name: "Person 2",
            score: 3
        }
        const record3 = {
            name: "Person 3",
            score: 4
        }

        let board = [record1, record2, record3];
        */
        let board = [];
        //sort the board by score

        localStorage.setItem('leader', JSON.stringify(board));

    }

}