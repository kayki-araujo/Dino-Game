const out = (out) => {
    document.querySelector(".out").innerHTML = JSON.stringify(out);
};

const game = document.getElementById("game");
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

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
    if (dino.classList.length > 0) {
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

    setTimeout(() => {
        dino.classList.remove(jumpProperties.className);
    }, jumpProperties.timing);
};

document.addEventListener("keydown", (event) => {
    keyAction(event.key);
});

setInterval(() => {
    let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
    );

    let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
    );

    if (cactusLeft < 54 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over!");
    }
}, 10);
