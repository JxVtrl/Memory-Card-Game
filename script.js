var keywords = [
  "abstract",
  "texture",
  "animal",
  "imagination",
  "wild",
  "penguins",
  "fish",
  "nature",
  "water",
  "sky",
  "clouds",
  "sun",
  "moon",
  "stars",
  "rain",
  "snow",
  "sunset",
  "sunrise",
  "night",
  "day",
  "night",
  "city",
  "building",
  "house",
  "cityscape",
  "landscape",
  "land",
  "mountain",
  "mountains",
  "river",
  "riverbank",
  "lake",
  "ocean",
  "beach",
  "island",
  "forest"
]

var table = document.getElementById("table")
let barLoad = document.getElementById("myBar")
let loadText = document.getElementById("loadText")
let nvlBtn = document.querySelectorAll(".nivel-btn")

let nivel_container = document.getElementById("nivel-container")
let table_container = document.getElementById("table-container")
let load_container = document.getElementById("load-container")

var pics = new Array

// Quantas cartas serão geradas antes de escolher um nivel de jogo (Recomendado: 15)
const numItemsToGenerate = 15;



// Get Images //
window.onload = () => {
  var refreshPicLoad = setInterval(() => {
    loader(refreshPicLoad)

    fetch(`https://source.unsplash.com/800x600/?${key()}`)
    .then((response) => {
       pics.push(response.url)
     })
    .catch(error => console.log(error))
    
  }, 1500)
}
// lOAD BAR // 
function loader(refreshPicLoad) {
  let width = Math.floor((((pics.length + 1 / numItemsToGenerate * 100)/2)*10))
  barLoad.style.width = width + '%'

  if (width >= 100) {
      loadText.innerHTML = 'Done!'
      
      for (let i = 0; i < nvlBtn.length; i++) {
        nvlBtn[i].disabled = false
      }
      
      clearInterval(refreshPicLoad)
  }
}



// Find keyword //
function key() {
  let num = Math.floor(Math.random() * keywords.length)
  let key = keywords[num]
  
  return key
}
  

var timer
// Time and Format //
function startTimer() {
  var time = 0;
  timer = setInterval(() => {
    time++;
    document.getElementById("time").innerHTML = formatTime(time);
  }, 1000);
}
function formatTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60

  if (seconds < 10)
    seconds = '0' + seconds
  
  if (minutes < 10)
    minutes = '0' + minutes

  return `${minutes}:${seconds}`
}



// Level 1 //
function nivel1() {
  table.innerHTML = ''
  let selected = []
  
  load_container.style.display = "none"
  nivel_container.style.display = "none"
  table_container.style.display = "block"
  
  // start Timer
  startTimer()
  
  // render cards
  render(selected)

  // Add listeners
  listen()
}

// Render Cards //
function render(selected) {
  // select 10 cards to duplicate
  let cardsNumber = 10

  // select 10 first cards to duplicate
  for (let i = 0; i < cardsNumber; i++) 
    selected.push(pics[i])

  // duplicate selected cards
  for (let i = 0; i < cardsNumber; i++) 
    selected.push(selected[i])

  // shuffle cards
  selected.sort(() => Math.random() - 0.5)

  // render cards
  for (let i = 0; i < selected.length; i++)
    table.innerHTML += `
      <li class="card-container">
        <div class="card">
          <section class="front">
            <img src="cardback.jpg" alt="back" class="cardBack">
          </section>
          <section class="back">
            <img src="${selected[i]}" alt="${selected[i]}" class="img">
          </section>
        </div>
      </li>`
}

// Add Listeners //
function listen() {
  let card_container = document.querySelectorAll(".card-container")

  for (let i = 0; i < card_container.length; i++)
    card_container[i].addEventListener("click", cardClick)      
}

// Card Click Function //
function cardClick(e) {
  let card = e.target.parentElement.parentElement.parentElement
  let congrats = document.getElementById("congrats")
  let flippeds = document.querySelectorAll(".flipped")
  let fLength = flippeds.length
  
  let carta1 = null 
  let carta2 = null 
  let img1 = null 
  let img2 = null 
  let cardsNumber = 20

  if(card.classList.contains("flipped"))
        return
  else {
    if (fLength == 0) {
      card.classList.add("flipped")
    }
    else if (fLength == 1) {
      card.classList.add("flipped")
      flippeds = document.querySelectorAll(".flipped")

      carta1 = flippeds[0]
      carta2 = flippeds[1]

      img1 = carta1.children[0].children[1].children[0]
      img2 = carta2.children[0].children[1].children[0]

      setTimeout(() => {
        if (img1.src !== img2.src) {
          carta1.classList.remove("flipped")
          carta2.classList.remove("flipped")
          img1.style.border = "none"
          img2.style.border = "none"
        }
        else {
          img1.style.border = "2px solid green"
          img2.style.border = "2px solid green"
          
          setTimeout(() => {
            carta1.classList.remove("flipped")
            carta2.classList.remove("flipped") 
            
            carta1.classList.add("matched")
            carta2.classList.add("matched")
            
            let matched = document.querySelectorAll(".matched")
            
            if (matched.length == cardsNumber) {
              clearInterval(timer)
              matched.forEach(card => {
                card.classList.remove("matched")
                card.classList.add("flipped")
              })
              congrats.innerHTML = `Parabéns, Você Venceu!`
            }
          }, 300);
        }
      }, 800);
    }
  }
}
    