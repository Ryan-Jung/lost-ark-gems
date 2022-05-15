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
    gemLevel = parseInt(gemLevel);
    levels[gemLevel] = parseInt(gemCost);
    let prevCost = gemCost;
    for(let i = gemLevel -1 ; i > 0; i--){
        levels[i] = Math.ceil(prevCost / 3);
        prevCost = levels[i];
    }
    prevCost = gemCost;
    for(let i = gemLevel + 1; i <= 10; i++ ){
        levels[i] = prevCost * 3;
        prevCost = levels[i];
    }
    return levels;
}

const showErrorOnInput = (inputId) => {
   $(`#${inputId}`).addClass('uk-form-danger');
}

const removeInputError = (inputId) => {
    $(`#${inputId}`).removeClass('uk-form-danger');
}
const isValidGemLevel = (gemLevel) => {
    if(!gemLevel || !String(gemLevel).match(/^\d+$/) || gemLevel <= 0 || gemLevel > 10 ){
        return false;
    }
    return true;
}

const isValidGemCost = (gemCost) => {
    if(!gemCost || !String(gemCost).match(/^\d+$/)){
        return false;
    }
    return true;
}


let generateElements = (gemCost, gemLevel, track = true) => {
    if(!isValidGemLevel(gemLevel)){
        showErrorOnInput('gemLevel');
        return;
    }
    removeInputError('gemLevel');
    if(!isValidGemCost(gemCost)){
        showErrorOnInput('gemCost');
        return;
    }
    removeInputError('gemCost');

    if(track){
        addPrevCalc(gemCost,gemLevel);
    }
    const levels = calculateCost(gemCost, gemLevel);
    const levelEl = document.getElementById("levels");
    let levelHeadersHTML = `<div class="level-item">
    <div class="container row">
        <span style="font-weight:bold">Gem Level</span>
        <span style="font-weight:bold">Expected Sale Price</span>
        <span style="font-weight:bold"> Buy < This Price = Profit</span>
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
        container.setAttribute("class", "container row");
        if(i === parseInt(gemLevel)){
            div.style.backgroundColor = 'lightgreen';
        }
        const levelText = document.createElement("span");
        const expectCost = document.createElement("span");
        const sellForAtLeast = document.createElement("span");
        levelText.textContent = i;
        expectCost.textContent = levels[i].toLocaleString('en-US');
        sellForAtLeast.textContent = Math.floor(levels[i] * .95).toLocaleString('en-US');
        sellForAtLeast.style.color = 'red';
        
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
    const MAX_PREV_VAL = 19;
    const container = document.getElementById("prev-calc-container");
    if(container?.children?.length > MAX_PREV_VAL){
        container?.children[MAX_PREV_VAL].remove();
    }
    let template = document.createElement("template");
    let prevCalc = `<div class="prev-calc-button-container">
                        <button class="prev-calc-button uk-button uk-button-default uk-button-small uk-width-1-1" onClick="generateElements(${gemCost}, ${gemLevel}, false)">Gem Level: ${gemLevel} <br> Price: ${gemCost}</button>
                        <button class="close uk-button uk-button-default uk-button-danger uk-button-small">&#10006</button>
                    </div>`;
    template.innerHTML = prevCalc;
    template.content.firstChild.getElementsByClassName("close")[0].addEventListener("click" , (event) => {
        event?.srcElement?.parentElement?.remove();
    });
    container.insertBefore(template.content.firstChild, container.firstChild);
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