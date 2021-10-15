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
  "forest",
]

// Quantas cartas serão geradas antes de escolher um nivel de jogo (Recomendado: 15)
const numItemsToGenerate = 15;

let table = document.getElementById("table")
var pics = new Array
let barLoad = document.getElementById("myBar")
let loadText = document.getElementById("loadText")
let nvlBtn = document.querySelectorAll(".nivel-btn")
let nivel_container = document.getElementById("nivel-container")

window.onload = () => {
  var refreshPicLoad = setInterval(() => {
    // make loader
    let width = Math.floor((((pics.length + 1 / numItemsToGenerate * 100)/2)*10))
    barLoad.style.width = width + '%'

    if (width >= 100) {
      loadText.innerHTML = 'Done!'

      for (let i = 0; i < nvlBtn.length; i++) {
        nvlBtn[i].disabled = false
        
      }

    }

    let num = Math.floor(Math.random() * keywords.length)
    let key = keywords[num]

    fetch(`https://source.unsplash.com/800x600/?${key}`)
   .then((response) => {
       pics.push(response.url)
     })
      .catch(error => console.log(error))
    
    if (pics.length == numItemsToGenerate-1) {
      console.log('pics completo')
      

      clearInterval(refreshPicLoad)
    }
    
  }, 1500)
}

function startTimer() {
  console.log(pics)
  var time = 0;
  var timer = setInterval(() => {
    time++;
    document.getElementById("time").innerHTML = time;
  }, 1000);
}

function oneMore() {
  let num = Math.floor(Math.random() * keywords.length)
  let key = keywords[num]

  fetch(`https://source.unsplash.com/1600x900/?${key}`)
   .then((response) => {
       return response.url
     })
    .catch(error => console.log(error))
    
    
}


function nivel1() {
  
  let table_container = document.getElementById("table-container")
  let load_container = document.getElementById("load-container")

  load_container.style.display = "none"
  nivel_container.style.display = "none"
  table_container.style.display = "block"



  // select 10 cards to duplicate
  let cardsNumber = 10
  let selected = []
  table.innerHTML = ''

  // select 10 first cards to duplicate
  for (let i = 0; i < cardsNumber; i++) 
    selected.push(pics[i])

  // duplicate selected cards
  for (let i = 0; i < cardsNumber; i++) 
    selected.push(selected[i])

  // shuffle cards
  selected.sort(() => Math.random() - 0.5)

  // render cards in table
  for (let i = 0; i < selected.length; i++)
    table.innerHTML += `
      <input type="checkbox" class="switch" id="${selected[i]}"/>
      <label class="card-container" for="${selected[i]}">
        <li class="card">
          <div class="front">
            <img src="cardback.jpg" alt="back" class="cardBack">
          </div>
          <div class="back">
            <img src="${selected[i]}" alt="${selected[i]}" class="img">
          </div>
        </li>
      </label>`
  
  startTimer()
}

