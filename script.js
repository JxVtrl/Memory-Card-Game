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

// Quantas cartas serão geradas antes de escolher um nivel de jogo (Recomendado: 15)
const numItemsToGenerate = 15;

var table = document.getElementById("table")
let barLoad = document.getElementById("myBar")
let loadText = document.getElementById("loadText")
let nvlBtn = document.querySelectorAll(".nivel-btn")

let nivel_container = document.getElementById("nivel-container")
let table_container = document.getElementById("table-container")
let load_container = document.getElementById("load-container")

let cards = document.querySelectorAll(".card")
var pics = new Array


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

function key() {
  let num = Math.floor(Math.random() * keywords.length)
  let key = keywords[num]
  
  return key
}
  


function startTimer() {
  var time = 0;
  var timer = setInterval(() => {
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
  let card_container = document.querySelectorAll(".card-container")
  console.log(card_container)

  for (let i = 0; i < card_container.length; i++)
    card_container[i].addEventListener("click", () => {
      if(card_container[i].classList.contains("flipped"))
        return
      else {
        check(card_container[i])
      }
  
    })
  

}

function check(card_container) {
  let flipped = document.querySelectorAll(".flipped")
  let matched = document.querySelectorAll(".matched")
  let cardsNumber = 20
  let carta1 
  let carta2
  let img1
  let img2

  // verificar quantas cartas estao viradas
  if(flipped.length < 2) {
    card_container.children[0].children[0].style.zIndex = "0"
    card_container.classList.add("flipped")
  }

  if (flipped.length == 2) {
    carta1 = flipped[0]
    carta2 = flipped[1]

    img1 = carta1.querySelector(".img").src
    img2 = carta2.querySelector(".img").src

    // verificar se as cartas sao iguais
    if (img1 == img2) {
      carta1.classList.add("matched")
      carta2.classList.add("matched")

      // remover cartas viradas
      carta1.classList.remove("flipped")
      carta2.classList.remove("flipped")
  
      carta1.style.border = "1px solid green"
      carta2.style.border = "1px solid green"

      setTimeout(() => {
        carta1.style.border = "none"
        carta2.style.border = "none"
      }, 3000);

      console.log(matched.length)
  
      // if all matched cards
      if (matched.length == cardsNumber) {
        clearInterval(timer)
        matched.forEach(card => card.classList.remove("matched"))
        alert("Você venceu!")
      }
    } else {
      // voltar cartas para o estado inicial
      carta1.children[0].children[0].style.zIndex = "1"
      carta2.children[0].children[0].style.zIndex = "1"
      carta1.classList.remove("flipped")
      carta2.classList.remove("flipped")
      
    }
  }
}