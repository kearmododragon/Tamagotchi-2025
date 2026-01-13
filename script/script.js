console.log("Tamagotchi game loaded");

let gameInterval;

const pet = {
    name: "Mousey",
    hunger: 50,
    happiness: 50,
    energy: 50,
    time: 0,
    level: 1,
    nextLevelUpTime: 5,
}

const buttons = document.querySelectorAll("#feed-btn, #play-btn, #sleep-btn");
buttons.forEach(btn => btn.disabled = true);

const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn")

// functions

function updateStats() {
    document.getElementById("hunger").textContent = pet.hunger
    document.getElementById("happiness").textContent = pet.happiness
    document.getElementById("energy").textContent = pet.energy
    document.getElementById("time-alive").textContent = `${pet.time} seconds alive`
    document.getElementById("level").textContent = `Level: ${pet.level}`
}

function checkGameStatus() {
    if (pet.hunger < 20){
        messageEl.textContent = `Warning! ${pet.name} is hungry.`
    } else if (pet.happiness < 20){
        messageEl.textContent = `Warning! ${pet.name} is sad.`
    } else if (pet.energy < 20){
        messageEl.textContent = `Warning! ${pet.name} is tired.`
    }
    if (pet.hunger == 0) {
        endGame(`${pet.name} has starved! The poor thing. Game over!`)
    } else if (pet.happiness == 0) {
        endGame(`${pet.name} got so bored they ran away. Game over!`)
    } else if (pet.energy == 0) {
        endGame(`${pet.name} is exhausted! The baby!. Game over!`)
    }
    if (pet.time >= pet.nextLevelUpTime){
        pet.level +=1;
        pet.nextLevelUpTime += 5;
        messageEl.textContent = `${pet.name} Levelled up!`
    }
}

function endGame(text) {
    messageEl.textContent = text;
    buttons.forEach(btn => btn.disabled = true);
    clearInterval(gameInterval);
    resetBtn.style.display = "inline-block"
}

function resetGame(){
    clearInterval(gameInterval);
    pet.name = "Mousey";
    pet.hunger = 50;
    pet.happiness = 50;
    pet.energy = 50;
    pet.time = 0;
    console.log(pet);
    updateStats()
    buttons.forEach(btn => btn.disabled = true);
    document.getElementById("pet-name-input").style.display = "block";
}

//event listeners

document.getElementById("feed-btn").addEventListener("click", () => {
    pet.hunger = Math.min(pet.hunger + 10, 100)
    pet.happiness = Math.min(pet.happiness + 5, 100)
    updateStats();
    checkGameStatus();
    console.log("feed")
})

document.getElementById("play-btn").addEventListener("click", () => {
    pet.energy = Math.max(pet.energy - 10, 0)
    pet.hunger = Math.max(pet.hunger - 5, 0)
    pet.happiness = Math.min(pet.happiness + 10, 100)
    updateStats();
    checkGameStatus();
    console.log("play")
})

document.getElementById("sleep-btn").addEventListener("click", () => {
    pet.energy = Math.min(pet.energy + 50, 100)
    pet.hunger = Math.max(pet.hunger - 5, 0)
    updateStats();
    checkGameStatus();
    console.log("sleep")
})

document.getElementById("set-name-btn").addEventListener("click", () => {
    const inputName = document.getElementById("name").value.trim();
    if (inputName !== "") {
        pet.name = inputName;
        document.getElementById("pet-name").textContent = pet.name;
        document.getElementById("pet-name-input").style.display = "none";
        buttons.forEach(btn => btn.disabled = false);
        gameInterval = setInterval(() => {
            pet.hunger = Math.max(pet.hunger - 5* pet.level, 0);
            pet.energy = Math.max(pet.energy -5* pet.level, 0);
            pet.happiness = Math.max(pet.happiness -5* pet.level, 0);
            pet.time = Math.max(pet.time +1, 0)
            console.log(pet.time);
            updateStats();
            checkGameStatus();
        }, 1000);
    }
});

document.getElementById("reset-btn").addEventListener("click", ()=> {
    console.log("reset clicked")
    resetGame()
})
updateStats();