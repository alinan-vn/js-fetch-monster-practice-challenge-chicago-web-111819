const MONSTERS_URL = 'http://localhost:3000/monsters';
let page = 1

function fetchMonsters(num = 0){
    // let page = 0
    page += num

    if (page === 0) {
        page = 1;
        // return an alert saying there no monsters going back
    }

    return fetch(MONSTERS_URL + `?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(json => displayMonsters(json))
};

function displayMonsters(array){
    const findBody = document.querySelector('body');
    for (const monst of array){
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        // let h5 = document.createElement('h5');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');

        h3.innerText = monst.name;
        p1.innerText = `Age: ${monst.age}`;
        p2.innerText = `Bio: ${monst.description}`;
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);
        div.id = 'monst'
        
        findBody.appendChild(div);
    };
};

function createMonsters(){
    console.log("i am in")
    const fieldInfo = document.querySelectorAll('input')
    let data = {
        name: fieldInfo[0].value,
        age: fieldInfo[1].value,
        bio: fieldInfo[2].value
    }
    console.log(data)

    let reqConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetch(MONSTERS_URL, reqConfig)
        .then(resp => resp.json)
        .then(json => console.log(json))
        .catch(error => console.log("something is fishy here..", error.message));
};

function createInput(type, placeholder, position) {
    const findBody = document.querySelector('body');
    let input = document.createElement('INPUT');
    input.setAttribute("type", type);
    input.setAttribute('placeholder', placeholder)
    findBody.insertBefore(input, findBody.children[position]);
}

function addFieldForm(){
    createInput('text', 'name...', 1);
    createInput('text', 'age...', 2);
    createInput('text', 'bio...', 3);
    createInput('submit', ' ', 4);

    let submitBtn = document.querySelectorAll('input')[3]
    submitBtn.addEventListener('click', createMonsters);  
};

function removeMonstersListed(){
    let allDivs = document.querySelectorAll('div#monst');
    for (let i = 0; i < allDivs.length; i++){
        allDivs[i].remove();
    }
    
};

function pageBtn(){
    let backBtn = document.getElementById('back');
    backBtn.addEventListener('click', function() {
        console.log("back??");
        removeMonstersListed();
        fetchMonsters(-1);
    });
    let forwardBtn = document.getElementById('forward');
    forwardBtn.addEventListener('click', function(){
        console.log("forwards????");
        removeMonstersListed();
        fetchMonsters(1);
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchMonsters();
    addFieldForm();
    pageBtn();
});