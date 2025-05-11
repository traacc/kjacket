const opportunities__list = document.querySelector(".opportunities__list");
const opportunitiesBack = document.querySelector(".opportunities__back");
const opportunitiesForward = document.querySelector(".opportunities__forward");

  opportunities__list.addEventListener('dragstart', (e)=>{

    opportunities__list.style.animation = 'unset';
    let dist = e.clientX;
    opportunities__list.style.transform = `translate(-${dist*4}px, 0)`
  });
  opportunitiesBack.addEventListener('click', ()=>{

  });

/* Quiz */

const quizState = {
    currentQuestion: 1,
    totalQuestions: 5,
    answers: {}
};

// DOM elements
const quiz = {
    counter: document.querySelector('.quiz__counter'),
    currentQuestionSpan: document.querySelector('.quiz__currentQuestion'),
    title: document.querySelector('.quiz__title'),
    answers: document.querySelectorAll('.quiz__answers'),
    backButton: document.querySelector('.quizBack'),
    nextButton: document.querySelector('.quizNext'),
};

// Initialize quiz
function initQuiz() {
    updateQuestionCounter();
    setupEventListeners();
}

// Update question counter display
function updateQuestionCounter() {
    quiz.currentQuestionSpan.textContent = quizState.currentQuestion;
}

// Show specific question
function showQuestion(questionNumber) {
    // Hide all question containers
    quiz.answers.forEach(container => {
        container.classList.add('hide');
    });
    
    // Show current question
    const currentQuestion = document.querySelector(`.quiz__answers--${questionNumber}`);
    if (currentQuestion) {
        currentQuestion.classList.remove('hide');
        // Update question title
        quiz.title.textContent = currentQuestion.dataset.question;
    }

    // Update button states
    updateNavigationButtons();
}

// Update navigation buttons
function updateNavigationButtons() {
    // Show/hide back button
    if (quizState.currentQuestion === 1) {
        quiz.backButton.classList.add('hide');
    } else {
        quiz.backButton.classList.remove('hide');
    }

    // Update next button text
    if (quizState.currentQuestion === quizState.totalQuestions) {
        quiz.nextButton.textContent = 'Отправить';
    } else {
        quiz.nextButton.textContent = 'Далее';
    }
}

// Validate current question
function validateCurrentQuestion() {
    const currentQuestionContainer = document.querySelector(`.quiz__answers--${quizState.currentQuestion}`);
    
    switch(quizState.currentQuestion) {
        case 1:
        case 2:
            // Check radio buttons
            const selectedRadio = currentQuestionContainer.querySelector('input[type="radio"]:checked');
            const customAnswer = currentQuestionContainer.querySelector('.quiz__customAnswer');
            return selectedRadio || (customAnswer && customAnswer.value.trim());
            
        case 3:
            // Check temperature inputs or checkbox
            const fromTemp = currentQuestionContainer.querySelector('input[name="q3-from"]');
            const toTemp = currentQuestionContainer.querySelector('input[name="q3-to"]');
            const needHelp = currentQuestionContainer.querySelector('input[name="q3-needHelp"]');
            return (fromTemp.value && toTemp.value) || needHelp.checked;
            
        case 4:
            // Check thickness input or checkbox
            const thickness = currentQuestionContainer.querySelector('input[name="q3-from"]');
            const needHelpThickness = currentQuestionContainer.querySelector('input[name="q4-needHelp"]');
            return thickness.value || needHelpThickness.checked;
            
        case 5:
            // Check contact details
            const name = currentQuestionContainer.querySelector('#quiz-name');
            const phone = currentQuestionContainer.querySelector('#quiz-phone');
            return name.value.trim() && phone.value.trim();
            
        default:
            return false;
    }
}

// Save current question answers
function saveCurrentAnswers() {
    const currentQuestionContainer = document.querySelector(`.quiz__answers--${quizState.currentQuestion}`);
    const answers = {};
    
    // Collect all inputs from current question
    const inputs = currentQuestionContainer.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'radio' && input.checked) {
            answers[input.name] = input.value;
        } else if (input.type === 'checkbox') {
            answers[input.name] = input.checked;
        } else if (input.type === 'text' || input.type === 'tel' || input.type === 'email' || input.tagName === 'TEXTAREA') {
            answers[input.name] = input.value;
        }
    });
    
    quizState.answers[quizState.currentQuestion] = answers;
}

// Handle form submission
function handleSubmit() {
    // Collect all answers
    const formData = {
        answers: quizState.answers,
        timestamp: new Date().toISOString()
    };
    
    // Here you would typically send the data to your server
    console.log('Quiz submitted:', formData);
    
    // You can implement your own submission logic here
    alert('Спасибо! Ваша заявка отправлена.');
}

// Setup event listeners
function setupEventListeners() {
    // Next button click
    quiz.nextButton.addEventListener('click', () => {
        if (!validateCurrentQuestion()) {
            alert('Пожалуйста, заполните все необходимые поля');
            return;
        }
        
        saveCurrentAnswers();
        
        if (quizState.currentQuestion === quizState.totalQuestions) {
            handleSubmit();
            return;
        }
        
        quizState.currentQuestion++;
        updateQuestionCounter();
        showQuestion(quizState.currentQuestion);
    });

    // Back button click
    quiz.backButton.addEventListener('click', () => {
        if (quizState.currentQuestion > 1) {
            quizState.currentQuestion--;
            updateQuestionCounter();
            showQuestion(quizState.currentQuestion);
        }
    });
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuiz);

/* Running Line */

function initOpportunities() {
    const wrapper = document.querySelector('.opportunities__wrapper');
    const list = document.querySelector('.opportunities__list');
    
    // Clone items for seamless loop
    const items = list.innerHTML;
    list.innerHTML = items + items;

    // Optional: Control animation speed based on screen width
    function updateSpeed() {
        const speed = window.innerWidth < 768 ? '20s' : '40s';
        list.style.animationDuration = speed;
    }

    window.addEventListener('resize', updateSpeed);
    updateSpeed();
}

// Call the function when document is loaded
document.addEventListener('DOMContentLoaded', initOpportunities);

/* FAQ Toggle */
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        question.addEventListener('click', () => {
            // Check if current item is active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq__answer');
                otherAnswer.classList.add('hide');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.classList.remove('hide');
            }
        });
    });
});

/* Spheres */

const swiperSpheres = new Swiper('.spheres--mobile .inner', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 60,

    // Navigation arrows
    navigation: {
        nextEl: '.spheres__forward',
        prevEl: '.spheres__back',
    },

});

/* Certs */

const swiperCerts = new Swiper('.certificatesSwiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 60,

    // Navigation arrows
    navigation: {
        nextEl: '.certificates__back',
        prevEl: '.certificates__forward',
    },

    breakpoints: {
        768: {
            slidesPerView: 4,
        },
    },
});

/* Materials */

const swiperMaterials = new Swiper('.materialsSwiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 60,

    // Navigation arrows
    navigation: {
        nextEl: '.materials__forward',
        prevEl: '.materials__back',
    },

});

if(opportunities__list) {
    //let animationStartTime = clients.querySelector(".clients__list .clients__row").getAnimations()[0].startTime;

    const opportunitiesAnim = gsap.to('.opportunities__list', { 
        x: -10000,
        duration: 90,
        repeat: -1,
        ease: "none",
    });
    opportunitiesAnim.seek(45)
    opportunitiesBack.addEventListener('mousedown', ()=>{
        opportunitiesAnim.timeScale(4);
        opportunitiesAnim.reverse();
        
        //changeAnimationSpeed(clientsRow, 10, animationStartTime);
        //clientsRow.classList.add('backSpeed');
    });
    opportunitiesBack.addEventListener('mouseup', ()=>{

        opportunitiesAnim.timeScale(1);
        //changeAnimationSpeed(clientsRow, 30, animationStartTime);
        //clientsRow.classList.remove('backSpeed');
    });

    opportunitiesForward.addEventListener('mousedown', (el)=>{
        opportunitiesAnim.play();
        opportunitiesAnim.timeScale(4);
        //changeAnimationSpeed(clientsRow, 10, animationStartTime);
        //clientsRow.classList.add('fowardSpeed');
    });
    opportunitiesForward.addEventListener('mouseup', (el)=>{

        opportunitiesAnim.timeScale(1);
        //changeAnimationSpeed(clientsRow, 30, animationStartTime);
        //clientsRow.classList.remove('fowardSpeed');
    });
}

/* Specs */

const specificationBtn = document.querySelector(".specification__btn");
const specificationTable2 = document.querySelector(".specification__list--2");

specificationBtn.addEventListener('click', ()=>{
    specificationBtn.classList.add('hide');
    specificationTable2.classList.remove('hide');
})