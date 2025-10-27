# Tamagotchi-2025
Unit-1 project 1
    - A good icebox feature (optional feature) is to allow the creatures to ‘level’ up after a certain amount of interactions / time.
    - May include interaction animations or asset changes.

MVP (Minimum Viable Product)
The goal: a fully playable, minimal version that demonstrates core functionality.
Core Gameplay
Pet starts as an egg and hatches into one basic animal at random.
    -   Only option is to pick "egg" as your character. After a randomised time (between 0 - 5 seconds) the egg with "hatch"
Display pet stats when egg hatches:
    Hunger              - Top left
    Tiredness           - Top Right
    Health              - Top Center
    Age / Time alive    - Bottom center
Stats decrease automatically over time.
    - "Health" is linked to hunger/tiredness. H/T is out of 5, Health out of 10 (H+T). When Health gets to 0 tamo dies. 
    - H/T are depleted based on time. They are reset when the player feeds/sleeps the animal
Player can:
    Feed the pet (increases hunger stat)        - Button bottom left
    Put pet to sleep (restores tiredness stat)  - Button bottom right
    Pet “dies” when a key stat (like health or hunger) reaches zero.    - Black "RIP" screen with skull and crossed bones
Display basic feedback on the screen (e.g. “Your pet looks tired!”).
    -   Warning for the player. When the status drops to 1/5 flash the warning
Simple restart/reset button.
Visual / Interface
Tamagotchi-style UI with "screen" in the center (egg shape, playful colours).
Static image of pet (no animation yet).
Simple buttons for feed/sleep.


Ice Box (Future Enhancements)
Features to add later as upgrades or for version 2.0.
Gameplay Enhancements
    Multiple animal types to choose from (with different difficulty levels). 2 choices for "Easy", "Medium", "Hard" where the key difference is the time for them to die is shortened
    Add more stats (e.g. happiness, cleanliness, energy). - Extra MVP. Other options of interaction. Clean up poop, play etc
    Evolving or growing pet based on care quality or age. - At different ages (time alive) animal should grow up

Interface & Visuals
    Animate the pet (blinking, moving, reacting to actions). - draw own 8bit animals to be animated
    Background changes (e.g. day/night cycle).              - depending on time of day or settings
    Sound effects or background music.
    Add a naming feature for your pet.                      - to be shown above the head of pet

Persistence
    Save and load progress (store stats, pet type, and age). - make the game more chill so you can save your pet and have it as a "background" game
    High-score or achievement system (longest survival time).    - sign in and have a "profile" with leaderboards for who kept their pet alive/happiest longest

![alt text](image-1.png)
![alt text](image.png)
![alt text](image.png)