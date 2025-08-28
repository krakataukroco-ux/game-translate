const questionEl = document.getElementById("question");
const form = document.getElementById("answerForm");
const input = document.getElementById("answer");
const feedback = document.getElementById("feedback");

let currentWord = "";
let correctTranslation = "";

// Ambil kata random dari API + filter panjang kata biar gampang
async function getRandomWord() {
  let word = "";
  do {
    const res = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await res.json();
    word = data[0];
  } while (word.length > 6); // kalau kepanjangan, ulang lagi
  return word;
}

// Translate kata Inggris ke Indonesia
async function getTranslation(word) {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|id`);
  const data = await res.json();
  return data.responseData.translatedText.toLowerCase();
}

// Setup pertanyaan baru
async function newQuestion() {
  currentWord = await getRandomWord();
  correctTranslation = await getTranslation(currentWord);

  questionEl.textContent = `Terjemahkan kata ini: "${currentWord}"`;
  feedback.textContent = "";
  input.value = "";
}

// Cek jawaban user
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

  setTimeout(newQuestion, 2000); // lanjut soal baru setelah 2 detik
});

// Mulai game
newQuestion();
