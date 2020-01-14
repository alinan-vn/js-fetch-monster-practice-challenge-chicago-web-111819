const MONSTERS_URL = 'http://localhost:3000/monsters';

function fetchMonsters(){
    let page = 1
    return fetch(MONSTERS_URL + `?_limit=20&_page=${page}`)
        .then(resp => resp.json())
        .then(json => displayMonsters(json))
};

function displayMonsters(array){
    const findBody = document.querySelector('body');
    for (const monst of array){
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        // let h5 = document.createElement('h5');
        let p = document.createElement('p');

        h3.innerText = monst.name;
        p.innerText = `Age: ${monst.age}`;
        div.appendChild(h3);
        div.appendChild(p);

        p.innerText = `Bio: ${monst.description}`;
        div.appendChild(p);
        findBody.appendChild(div);
    };
};

function createMonsters(){
    console.log("i am in")
    // let data = 'FORM DATA FIELDS AS AN OBJECT'

    // let reqConfig = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": Type,
    //         "Accept": TYPE
    //     },
    //     body: JSON.stringify(data)
    // };

    // return fetch()
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
    console.log(submitBtn)
};

document.addEventListener('DOMContentLoaded', ()=>{
    fetchMonsters();
    addFieldForm();

});