const words = ["cat", "dog", "book", "house", "car", "tree", "love", "friend"];
let currentWord = "";
let correctTranslation = "";

const questionEl = document.getElementById("question");
const form = document.getElementById("answerForm");
const input = document.getElementById("answer");
const feedback = document.getElementById("feedback");

// Ambil kata random
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Ambil terjemahan via API
async function getTranslation(word) {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|id`);
  const data = await res.json();
  return data.responseData.translatedText.toLowerCase();
}

// Setup pertanyaan baru
async function newQuestion() {
  currentWord = getRandomWord();
  correctTranslation = await getTranslation(currentWord);
  questionEl.textContent = `Terjemahkan kata ini: "${currentWord}"`;
  feedback.textContent = "";
  input.value = "";
}

// Cek jawaban
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userAnswer = input.value.trim().toLowerCase();
  if (userAnswer === correctTranslation) {
    feedback.textContent = "✅ Jawaban benar!";
    feedback.style.color = "lime";
  } else {
    feedback.textContent = `❌ Salah! Jawaban benar: ${correctTranslation}`;
    feedback.style.color = "red";
  }
  setTimeout(newQuestion, 2000); // lanjut soal berikut setelah 2 detik
});

// Mulai game
newQuestion();