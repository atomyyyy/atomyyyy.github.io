const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of Japan?", answer: "Tokyo" },
    { question: "What is the largest planet?", answer: "Jupiter" },
];

let currentCardIndex = 0;
const flashcardElement = document.getElementById('flashcard');
const frontElement = document.getElementById('front');
const backElement = document.getElementById('back');
const flipButton = document.getElementById('flipButton');
const nextButton = document.getElementById('nextButton');

function updateFlashcard() {
    const currentCard = flashcards[currentCardIndex];
    frontElement.textContent = currentCard.question;
    backElement.textContent = currentCard.answer;
    flashcardElement.classList.remove('flipped');
}

flipButton.addEventListener('click', () => {
    flashcardElement.classList.toggle('flipped');
});

nextButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    updateFlashcard();
});

// Initialize the first flashcard
updateFlashcard();
