const getGemsWorthShit = () => {
    const attackSkills = [
        "Chain Slash*",
        "Cutting Wind*",
        "Half Moon Slash",
        "Red Dragon's Horn",
        "Raging Dragon Slash",
        "Starfall Pounce",
        "Wheel of Blades",
        "Thrust of Destruction*"
    ];
    const cdSkills = [
        "Half Moon Slash",
        "Raging Dragon Slash",
        "Red Dragon's Horn",
        "Shackling Blue Dragon"
    ]
    const attack = document.getElementById("attack");
    const cd = document.getElementById("cd");
    attackSkills.forEach( skill => {
        let li = document.createElement("li");
        li.setAttribute("class", "attack-list-item");
        li.textContent = skill;
        attack.appendChild(li);
    });
    cdSkills.forEach( skill => {
        let li = document.createElement("li");
        li.setAttribute("class", "cd-list-item");
        li.textContent = skill;
        cd.appendChild(li);
    });
}

const calculateCost = (gemCost, gemLevel) => {
    let levels = [];
    levels[gemLevel] = gemCost;
    let prevCost = gemCost;
    for(let i = gemLevel -1 ; i > 0; i--){
        levels[i] = Math.floor(prevCost / 3);
        prevCost = levels[i];
    }
    return levels;
}

const print = (levels) => {
    for(let i = levels.length - 1; i > 0; i--){
        console.log(`Level ${i} expected cost => ${levels[i]}. Sell for at least ${levels[i] * 1.05}`);
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    getGemsWorthShit();
    const calculate = document.getElementById("calculate");
    calculate.addEventListener("click", () => {
        const gemCost = document.getElementById("gemCost").value;
        const gemLevel = document.getElementById("gemLevel").value;
        const levels = calculate(gemCost, gemLevel);
        for(let i = levels.length - 1; i > 0; i--){
            const li = document.createElement("li");
            li.setAttribute("class", "level-item")
            const container = document.createElement("div");
            container.setAttribute("class", "container");
            
            const levelText = document.createElement("span");
            const expectCost = document.createElement("span");
            const sellForAtLeast = document.createElement("span");
            levelText.textContent = i;
            expectCost.textContent = levels[i];
            sellForAtLeast.textContent = levels[i] * 1.05;
      
            container.appendChild(levelText);
            container.appendChild(expectCost);
            container.appendChild(sellForAtLeast);
        } 
    })
});