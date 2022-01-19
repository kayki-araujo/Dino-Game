const game = document.getElementById("game");
const dino = document.getElementById("dino");

let isGameOver = false;

const getCactus = () => {
    return Array.from(document.getElementsByClassName("cactus"));
};

const placeCactus = () => {
    if (isGameOver) {
        return;
    }
    const cactusType = parseInt(Math.random() * (4 - 1) + 1);
    const cactusId = crypto.randomUUID();
    const cactus = document.createElement("div");
    cactus.classList.add("cactus", "move", "cactus-" + cactusType);
    cactus.id = cactusId;
    game.appendChild(cactus);
    setTimeout(() => {
        if (isGameOver) {
            return;
        }
        game.removeChild(document.getElementById(cactusId));
    }, 1000);
};

const keyAction = (key) => {
    const keyCommand = {
        " ": () => {
            jump("small");
        },
        Shift: () => {
            jump("big");
        },
    };

    if ((command = keyCommand[key])) {
        command();
    }
};

const jump = (type) => {
    if (dino.classList.length > 2) {
        return;
    }

    const typesProperties = {
        small: {
            className: "smallJump",
            timing: 400,
        },

        big: {
            className: "bigJump",
            timing: 500,
        },
    };

    const jumpProperties = typesProperties[type];

    dino.classList.add(jumpProperties.className);
    dino.classList.remove("dinoRun");

    setTimeout(() => {
        if (dino.style.animationPlayState != "paused") {
            dino.classList.remove(jumpProperties.className);
            dino.classList.add("dinoRun");
        }
    }, jumpProperties.timing);
};

const isDinoColliding = () => {
    let individualCheck = (cactus) => {
        {
            const coord = {
                dinoLeft: parseInt(
                    window.getComputedStyle(dino).getPropertyValue("left")
                ),
                dinoTop: parseInt(
                    window.getComputedStyle(dino).getPropertyValue("top")
                ),
                dinoWidth: parseInt(
                    window.getComputedStyle(dino).getPropertyValue("width")
                ),
                dinoHeight: parseInt(
                    window.getComputedStyle(dino).getPropertyValue("height")
                ),
                cactusLeft: parseInt(
                    window.getComputedStyle(cactus).getPropertyValue("left")
                ),
                cactusTop: parseInt(
                    window.getComputedStyle(cactus).getPropertyValue("top")
                ),
                cactusWidth: parseInt(
                    window.getComputedStyle(cactus).getPropertyValue("width")
                ),
            };

            return !(
                coord.cactusLeft + coord.cactusWidth < coord.dinoLeft ||
                coord.dinoLeft + coord.dinoWidth < coord.cactusLeft ||
                coord.dinoHeight + coord.dinoTop < coord.cactusTop
            );
        }
    };
    const allCactus = Array.from(document.getElementsByClassName("cactus"));
    return allCactus.some((cactus) => individualCheck(cactus));
};

const gameOver = () => {
    isGameOver = true;
    getCactus().forEach((cactus) => {
        dino.style.animationPlayState = "paused";
        dino.classList.add("dead");
        dino.classList.remove("alive", "dinoRun");
        cactus.style.animationPlayState = "paused";
    });
};

document.addEventListener("keydown", (event) => {
    keyAction(event.key);
});

setInterval(() => {
    if (isDinoColliding()) {
        gameOver();
    }
}, 1);

const CACTUS_SPAWN_CHANCE = 2 / 5;
const SPAWN_INTERVAL = 400; // ms
setInterval(() => {
    if (Math.random() < CACTUS_SPAWN_CHANCE) {
        placeCactus();
    }
}, SPAWN_INTERVAL);
