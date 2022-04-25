var entries = [];

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
        let span = document.createElement("span");
        span.setAttribute("class", "attack-list-item");
        span.textContent = skill;
        attack.appendChild(span);
    });
    cdSkills.forEach( skill => {
        let span = document.createElement("span");
        span.setAttribute("class", "cd-list-item");
        span.textContent = skill;
        cd.appendChild(span);
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

let generateElements = (gemCost, gemLevel, track = true) => {
    if(track){
        addPrevCalc(gemCost,gemLevel);
    }
    const levels = calculateCost(gemCost, gemLevel);
    const levelEl = document.getElementById("levels");
    let levelHeadersHTML = `<div class="level-item">
    <div class="container">
        <span>Gem Level</span>
        <span>Price to Buy At</span>
        <span>Break Even Price</span>
    </div>
    </div>`;
    levelEl.innerHTML = "";
    let levelHeaders = document.createElement("template");
    levelHeaders.innerHTML = levelHeadersHTML.trim();
    levelEl.appendChild(levelHeaders.content.firstChild);
    for(let i = levels.length - 1; i > 0; i--){
        const div = document.createElement("div");
        div.setAttribute("class", "level-item")
        const container = document.createElement("div");
        container.setAttribute("class", "container");
        
        const levelText = document.createElement("span");
        const expectCost = document.createElement("span");
        const sellForAtLeast = document.createElement("span");
        levelText.textContent = i;
        expectCost.textContent = levels[i];
        sellForAtLeast.textContent = Math.ceil(levels[i] * 1.05);
  
        container.appendChild(levelText);
        container.appendChild(expectCost);
        container.appendChild(sellForAtLeast);
        div.appendChild(container);

        levelEl.appendChild(div);
    } 
}

const close = (event) => {
    console.log(event);
}

const addPrevCalc = (gemCost,gemLevel) =>{
    const container = document.getElementById("prev-calc-container");
    let template = document.createElement("template");
    let prevCalc = `<div class="prev-calc-button-container">
                        <button class="prev-calc-button" onClick="generateElements(${gemCost}, ${gemLevel}, false)">Gem Level: ${gemLevel}|Cost: ${gemCost}</button>
                        <button class="close">&#10006</button>
                    </div>`;
    template.innerHTML = prevCalc;
    template.content.firstChild.getElementsByClassName("close")[0].addEventListener("click" , (event) => {
        event?.srcElement?.parentElement?.remove();
    });
    container.prepend(template.content.firstChild);
} 



document.addEventListener("DOMContentLoaded", function() {
    getGemsWorthShit();
    const calculate = document.getElementById("calculate");
    calculate.addEventListener("click", () => {
        const gemCost = document.getElementById("gemCost").value;
        const gemLevel = document.getElementById("gemLevel").value;
        generateElements(gemCost,gemLevel);
    });

    document.addEventListener( "keydown", (event) => {
        if(event?.key == "Enter"){
            const gemCost = document.getElementById("gemCost").value;
            const gemLevel = document.getElementById("gemLevel").value;
            generateElements(gemCost,gemLevel);
        }
    })
});