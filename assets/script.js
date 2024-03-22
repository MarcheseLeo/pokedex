let min = 0
let max = localStorage.getItem('defaultMax')
const minInput = document.getElementById('offset')
const maxInput = document.getElementById('limit')
const rangeBtn = document.getElementById('rangeBtn')
if(max == 'null' || max== 0){
    max = 10
}

maxInput.value = max
let pokedex
const hp = document.getElementById('hp')
const atk = document.getElementById('attack')
const def = document.getElementById('defense')
const spAtk = document.getElementById('spAtk')
const spDef = document.getElementById('spDef')
const speed = document.getElementById('speed')
const attributesUl = document.getElementById('attributesUl')
/*=================== Fetch di tutto il pokedex ===================*/
fetch(`https://pokeapi.co/api/v2/pokemon?offset=${min}&limit=${max}`)
    .then(response => {
        if(!response.ok) throw new Error('Issue with fetching data')
        return response.json();
    })
    .then(data => {
        pokedex = data.results.slice()

        generaCards(pokedex);
    })
    .catch((err) => {
        console.warn(err.message)
    })

/*=================== Funzione per generare le card ===================*/
function generaCards(pokedex) {

    while (pokeBox.firstChild) {
        pokeBox.removeChild(pokeBox.firstChild)
    }
    pokedex.forEach(pokemon => {
        const name = pokemon.name
        fetch(pokemon.url)
            .then(response => {
                return response.json()
            }).then(data => {

                const card = `<div class="inline-block cursor-pointer rounded-xl pointer m-auto max-w-[200px] p-5 hover:bg-slate-200">
              <img class="h-22 max-w-22 max-h-22 w-22 border bg-white border-black" onclick="getDetails(event)" src='${data.sprites.other['official-artwork'].front_default}' alt="immagine ${name}" name="${name}" >
              <h3 class="bg-slate-300 w-18 p-2 text-wrap text-center text-sm mt-2" onclick="getDetails(event)" name="${name}">${name}</h3></div>`
                pokeBox.insertAdjacentHTML("beforeend", card)
                // console.log(data.types)

            })
    });
}
/*=================== Event listener sulla barra di ricerca ===================*/
const searchBar = document.getElementById("searchBar")
searchBar.addEventListener("keyup", (e) => {
    pokemonDetailsBox.classList.add('hidden')
    pokeBox.classList.remove('hidden')
    audioPlayer.pause()
    playBtn.name = 'play-circle-outline'

    let pokemonFiltrati = []
    pokedex.forEach(pokemon => {
        if (pokemon.name.startsWith(e.target.value))
            pokemonFiltrati.push(pokemon)
    });
    generaCards(pokemonFiltrati)


})
const pokeBox = document.getElementById('pokedex')
const closeBtn = document.querySelector('.closeBtn')
const pokemonDetailsBox = document.getElementById('pokemonDetailsBox')
const image = document.getElementById('detailsImage')
const h2 = document.getElementById('detailsName')
/*=================== funzione per la visualizzazione del box dei dettagli ===================*/
function getDetails(event) {
    var name = event.target.getAttribute('name');
    h2.innerHTML = event.target.name

    // console.log('Il nome del pokemon cliccata e : ' + name);
    pokeBox.classList.add('hidden')
    pokemonDetailsBox.classList.remove('hidden')

    /*=================== Fetch del singolo pokemon ===================*/
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            image.src = data.sprites.front_default
            // console.log(data.types)
            // console.log(data.stats[5].base_stat)
            audioPlayer.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${data.id}.ogg`
            /*=================== Creazione lista tipi ===================*/
            data.types.forEach(item => {
                let type = item.type.name
                // console.log(item.type['name'])

                let li = document.createElement('li')
                li.innerHTML = type
                if (type == "normal") li.style.backgroundColor = 'grey'
                else if (type == "fighting") li.style.backgroundColor = '#FF5500'
                else if (type == "flying") li.style.backgroundColor = '#81B9EF'
                else if (type == "poison") li.style.backgroundColor = '#9141CB'
                else if (type == "ground") li.style.backgroundColor = '#915121'
                else if (type == "rock") li.style.backgroundColor = '#AFA981'
                else if (type == "bug") li.style.backgroundColor = '#91A119'
                else if (type == "ghost") li.style.backgroundColor = '#704170'
                else if (type == "steel") li.style.backgroundColor = '#60A1B8'
                else if (type == "fire") li.style.backgroundColor = '#E62829'
                else if (type == "water") li.style.backgroundColor = '#2980EF'
                else if (type == "grass") li.style.backgroundColor = '#3FA129'
                else if (type == "electric") li.style.backgroundColor = '#fac000'
                else if (type == "psychic") li.style.backgroundColor = '#ef4179'
                else if (type == "ice") li.style.backgroundColor = '#3fd8ff'
                else if (type == "dragon") li.style.backgroundColor = '#5060e1'
                else if (type == "dark") li.style.backgroundColor = '#50413f'
                else if (type == "fairy") li.style.backgroundColor = '#EF70EF'
                li.style.margin = '8px 0px'
                li.style.textAlign = 'center'
                li.style.padding = '4px'
                li.style.fontWeight = '600'
                li.style.border = '1px solid grey'
                ul.appendChild(li)
            });

            /*=================== Creazione lista abilità===================*/
            data.abilities.forEach(item => {
                let ability = item.ability.name
                // console.log(ability)
                let li = document.createElement('li')
                li.innerHTML = ability
                li.style.margin = '8px 0px'
                li.style.textAlign = 'center'
                li.style.padding = '4px'
                li.style.fontWeight = '600'
                li.style.border = '1px solid grey'
                li.style.backgroundColor = "#d2d2d2"
                attributesUl.appendChild(li)
            })

            hp.innerHTML = data.stats[0].base_stat
            atk.innerHTML = data.stats[1].base_stat
            def.innerHTML = data.stats[2].base_stat
            spAtk.innerHTML = data.stats[3].base_stat
            spDef.innerHTML = data.stats[4].base_stat
            speed.innerHTML = data.stats[5].base_stat
        })
}
const ul = document.getElementById('ul')
/*=================== Event listener sul bottone di chiusura ===================*/
closeBtn.addEventListener('click', function () {
    pokemonDetailsBox.classList.add('hidden')
    pokeBox.classList.remove('hidden')
    audioPlayer.pause()
    playBtn.name = 'play-circle-outline'
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    while (attributesUl.firstChild) {
        attributesUl.removeChild(attributesUl.firstChild)
    }
})
let isImage1 = true
/*=================== Event listener su immagine dettagli pokemon ===================*/
image.addEventListener('click', function () {
    console.log(image.getAttribute('src'))
    let url = image.getAttribute('src')
    var id = url.match(/\d+/g)
    console.log(id)
    if (isImage1) {
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    } else {
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    }
    isImage1 = !isImage1
})

const playBtn = document.getElementById('playBtn')
const audioPlayer = document.getElementById('audioPlayer')
let isClicked = true
/*=================== Event listener sul bottone audio ===================*/
playBtn.addEventListener('click', function () {

    if (isClicked) {
        audioPlayer.play()
        playBtn.name = 'stop-circle-outline'
    } else {
        audioPlayer.pause()
        audioPlayer.currentTime = 0
        playBtn.name = 'play-circle-outline'
    }
    isClicked = !isClicked
})




/*=================== Event listener per aggiornare il pokedex sul range ===================*/
rangeBtn.addEventListener('click', function () {
    if (minInput.value < 0 || maxInput.value <= 0 || maxInput.value > 1302 || minInput.value > 1302) {
        alert('Inserire valori positivi nel range: 0 - 1302')
        minInput.value = 0;
        maxInput.value = 10;
    } else {
        // console.log(minInput.value)
        // console.log(maxInput.value)
        min = minInput.value
        max = maxInput.value
        localStorage.setItem('defaultMax', max)
    }

    while (pokeBox.firstChild) {
        pokeBox.removeChild(pokeBox.firstChild)
    }

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${min}&limit=${max}`)
        .then(response => {
            if(!response.ok) throw new Error('Issue with fetching data')
            return response.json();
        })
        .then(data => {
            pokedex = data.results.slice()

            generaCards(pokedex);
        })
        .catch((err) => {
            console.warn(err.message)
        })
})