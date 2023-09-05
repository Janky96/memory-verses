const backgroundColors = ["#343a40", "#fa5252", "#e03131", "#f06595", "#c2255c", "#cc5de8", "#9c36b5",
 "#845ef7", "#6741d9", "#5c7cfa", "#3b5bdb", "#339af0", "#1971c2", "#22b8cf", "#099268", "#51cf66",
 "#2f9e44", "#f08c00", "#ff922b", "#e8590c"];
const finishedCard =   {
  verse: "FINISHED!",
  content: "Well done"
}
const card = document.querySelector(".card");
const front = document.querySelector(".front");
const back = document.querySelector(".back");
const backContainer = document.querySelector(".back-container");
const shuffle = document.querySelector(".ph-shuffle");
const home = document.querySelector(".ph-house");
const next = document.querySelector(".ph-arrow-right");
let memoryVerses;
let hideRandom = false;
let hideNext = false;
let index = 0;

getData();
checkIconsVisibility();

async function getData() {
  fetch("./memory-verses.json").then(res => res.json())
    .then(data => {
    memoryVerses = shuffleArray(data);
    generateCardFromArray(index);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateCardFromArray(indexVerse) {
  const chosenVerse = memoryVerses[indexVerse];
  generateCard(chosenVerse.verse, chosenVerse.content);
}

function generateCard(verse, content) {
  const randomBgColor = backgroundColors[getRandomInt(backgroundColors.length)];
  front.style.backgroundColor = randomBgColor;
  back.style.backgroundColor = randomBgColor;

  let frontContent = `<h1>${verse}</h1>`;
  let backContent = `<h1>${verse}</h1>
    <p>${content}</p>`;
  front.innerHTML = frontContent;
  backContent.innerHTML = frontContent;
  setTimeout(() => {
    backContainer.innerHTML = backContent;
  }, 1000);
}

home.addEventListener("click", () => {
  hideRandom = false;
  hideNext = false;
  checkIconsVisibility();
  memoryVerses = shuffleArray(memoryVerses);
  index = 0;
  generateCardFromArray(index);
});

next.addEventListener("click", () => {
  index++;
  if(index === memoryVerses.length) {
    generateCard(finishedCard.verse, finishedCard.content);
  } else if(index === memoryVerses.length + 1) {
    hideRandom = false;
    memoryVerses = shuffleArray(memoryVerses);
    index = 0;
    generateCardFromArray(index);
  } else {
    hideRandom = true;
    generateCardFromArray(index);
  }
  checkIconsVisibility();
});

shuffle.addEventListener("click", () => {
  debugger;
  hideNext = true;
  checkIconsVisibility();
  index = getRandomInt(memoryVerses.length - 1);
  generateCardFromArray(index);
});


/* ----- HIDE ICONS ----- */
function checkIconsVisibility() {
  if(hideNext) {
    next.style.display = "none";
  } else {
    next.style.display = "block";
  }

  if(hideRandom) {
    shuffle.style.display = "none";
  } else {
    shuffle.style.display = "block";
  }
}
/* ----- HIDE ICONS ----- */