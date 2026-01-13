console.log("Tamagotchi game loaded");

let gameInterval;

const pet = {
    name: "Steven",
    hunger: 50,
    happiness: 50,
    energy: 50,
    time: 0,
    level: 1,
    nextLevelUpTime: 5,
}
const animalImages = {
    dog: "imgs/dog.png",
    fish: "imgs/Fish.png",
    lion: "imgs/Lion.png",
    molerat: "imgs/mole-rat.png",
    mouse: "imgs/Mouse.png",
    snake: "imgs/Snake.png",
}
const buttons = document.querySelectorAll("#feed-btn, #play-btn, #sleep-btn");
buttons.forEach(btn => btn.disabled = true);

const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset-btn");
const animalSelect = document.getElementById("animal-select");
const hungerEl = document.getElementById("hunger");
const happinessEl = document.getElementById("happiness");
const energyEl = document.getElementById("energy");

let petAlive = false
// functions
function updateStats() {
    document.getElementById("hunger").textContent = pet.hunger
    document.getElementById("happiness").textContent = pet.happiness
    document.getElementById("energy").textContent = pet.energy
    document.getElementById("time-alive").textContent = `${pet.time} seconds alive`
    document.getElementById("level").textContent = `Level: ${pet.level}`
    hungerEl.textContent = pet.hunger;
    happinessEl.textContent = pet.happiness;
    energyEl.textContent = pet.energy;
    hungerEl.classList.toggle("low-stat", pet.hunger < 20);
    happinessEl.classList.toggle("low-stat", pet.happiness < 20);
    energyEl.classList.toggle("low-stat", pet.energy < 20);
    hungerEl.classList.toggle("high-stat", pet.hunger > 90);
    happinessEl.classList.toggle("high-stat", pet.happiness > 90);
    energyEl.classList.toggle("high-stat", pet.energy > 90);
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
        pet.nextLevelUpTime += 10;
        messageEl.textContent = `${pet.name} Levelled up!`
    }
    updateAnimalWobble();
}
function endGame(text) {
    messageEl.textContent = text;
    buttons.forEach(btn => btn.disabled = true);
    clearInterval(gameInterval);
    resetBtn.style.display = "inline-block"
    petAlive = false
    stopAnimalWobble();
}
function resetGame(){
    clearInterval(gameInterval);
    pet.name = "Steven";
    pet.hunger = 50;
    pet.happiness = 50;
    pet.energy = 50;
    pet.time = 0;
    pet.level = 1;
    pet.nextLevelUpTime = 5;
    updateStats();
    buttons.forEach(btn => btn.disabled = true);
    document.getElementById("pet-setup").style.display = "flex";
    document.getElementById("pet-img").src = "../imgs/egg.png";
    messageEl.textContent = "";
    resetBtn.style.display = "none";
}
function updateAnimalWobble() {
    if(!petAlive) return;
    const petImg = document.getElementById("pet-img");
    const baseDuration = 1;
    const speed = Math.max(0.3, baseDuration - (pet.level - 1) * 0.1); 
    petImg.style.animation = `wobble ${speed}s infinite`;
    petImg.classList.add("animal-wobble");
}
function stopAnimalWobble() {
    const petImg = document.getElementById("pet-img");
    petImg.classList.remove("animal-wobble");
    petImg.style.animation = "";
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
    const selectedAnimal = animalSelect.value; 
    if (inputName !== "") {
        pet.name = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    }
    if (!selectedAnimal) {
        messageEl.textContent = "Please select an animal to start!";
        return; 
    }
    pet.animal = selectedAnimal;
    document.getElementById("pet-setup").style.display = "none";
    document.getElementById("pet-name").textContent = pet.name;
    if (pet.animal === "Random") {
        const animalKeys = Object.keys(animalImages);
        const randomIndex = Math.floor(Math.random() * animalKeys.length);
        pet.animal = animalKeys[randomIndex];
    }
    const eggImg = document.getElementById("pet-img");
    eggImg.classList.add("wobble");
    const delay = Math.floor(Math.random() * 4000) + 1000;
    petAlive = true
    updateAnimalWobble();
    setTimeout(() => {
        eggImg.classList.remove("wobble");
        document.getElementById("pet-img").src = animalImages[pet.animal.toLowerCase()];
        buttons.forEach(btn => btn.disabled = false);
        gameInterval = setInterval(() => {
            pet.hunger = Math.max(pet.hunger - 5 * pet.level, 0);
            pet.energy = Math.max(pet.energy - 5 * pet.level, 0);
            pet.happiness = Math.max(pet.happiness - 5 * pet.level, 0);
            pet.time = Math.max(pet.time + 1, 0);
            updateStats();
            checkGameStatus();
        }, 1000);
    }, delay);
});
document.getElementById("reset-btn").addEventListener("click", ()=> {
    console.log("reset clicked")
    resetGame()
})
updateStats();