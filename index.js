// Select
let newShitFormContainer = document.getElementById('new-shit-form-container')
let shitContainer = document.getElementById('shit-container')
const shitAdapter = new ShitAdapter("http://localhost:3000/shits")
const tipAdapter = new TipAdapter("http://localhost:3000/tips")
// const shitAdapter = new ShitAdapter("https://quitshit-backend.herokuapp.com/shits")
// const tipAdapter = new TipAdapter("https://quitshit-backend.herokuapp.com/tips")
// const shits = [] 

// Display Add Shit Form
newShitFormContainer.innerHTML = shitForm()
function shitForm() {
    return `
      <form class="add-shit-form" id="shit-form">
        <input type="text" name="name" value="" required>
        <input type="submit" value="Add New Shit to Quit">
      </form>
  `
}
// Listen - Add Shit Form
newShitFormContainer.addEventListener('submit', function (e) {
    if (e.target.className == "add-shit-form") {
        e.preventDefault()
        let shit = {
            'name': document.querySelector("[name='name']").value
        }
        e.target.reset()
// Do - Add Shit
        shitAdapter.addShit(shit)
        .then(function (shit) {
            if (shit.message) {
                alert(shit.message)
            } else {
            shitContainer.innerHTML += makeShitDiv(shit)
            shitContainer.innerHTML +=  makeTipsDiv(shit)
            }
        })
        // .catch(function (error) {
        //     alert("error message")
        // })
    }
})

// Display Shits & Tips
shitAdapter.fetchShits()
    .then(function (shitsArray) {
        // shits = shitsArray
        // debugger
        shitsArray.sort(function(a, b) {
            return b.shit_count - a.shit_count
        })
        shitsArray.forEach(function (shit) {
            shitContainer.innerHTML += makeShitDiv(shit)
            shitContainer.innerHTML += makeTipsDiv(shit)
        })
    })
function makeShitDiv(shit) {
    return `
    <div id=shit-${shit.id} class='shit-div'>
        <div id=shit-${shit.id}-details>
            <h3>${shit.name} <button id='${shit.id}' class='shit-button' data-shitcount='${shit.shit_count}'> 💩 ${shit.shit_count} ▲ </button></h3>
        </div>
    </div>
    `
}
function makeTipsDiv(shit) {
    let tipsArray = shit.tips
    tipsArray.sort(function (a, b) {
        return b.tip_count - a.tip_count
    })
    return `
    <div id=shit-${shit.id}-tips class='tip-div'>
        ${tipForm(shit.id, shit)}
        <ul id=shit-${shit.id}-tips-list>
            ${tipsArray.map(makeTipLi).join("")}
        </ul>
    </div>
    `
}
function makeTipLi(tip) {
    return `<li>${tip.description} <button id='${tip.id}' class='tip-button' data-tipcount='${tip.tip_count}'> 💩 ${tip.tip_count} ▲ </button> </li>`
}

// Display Add Tip Form
function tipForm(shit_id, shit) {
    return `
      <form class="add-tip-form" id="${shit_id}-tip-form">
        <input type="text" name="description" value="" required>
        <input type="hidden" name="shit_id" value="${shit_id}">
        <input type="submit" value="Add Quit Tip for ${shit.name}">
      </form>
  `
}
// Listen - Add Tip Form
shitContainer.addEventListener('submit', function (e) {
    if (e.target.className == "add-tip-form") {
        e.preventDefault()
        let tip = []
        e.target.querySelectorAll('input').forEach(function (input) {
            tip.push(input.value)
        })
        e.target.reset()
// Do - Add Tip
        tipAdapter.addTip(tip)
            .then(function (tip) {
                    let tipShitListUl = document.getElementById(`shit-${tip.shit_id}-tips-list`)
                    tipShitListUl.innerHTML += makeTipLi(tip)
            })
    }
})

// Increment Shit Counter
// Select - Shit Count
// Listen - Add Shit Count
shitContainer.addEventListener('click', (e) => {
    if (e.target.className == "shit-button") {
// Do - Increase Shit Count
        e.target.dataset.shitcount = parseInt(e.target.dataset.shitcount) + 1
        shitAdapter.fetchShit(e)
        .then(() => {
            shitAdapter.fetchShits()
                .then(function (shitsArray) {
                    shitsArray.sort(function (a, b) {
                            return b.shit_count - a.shit_count
                        })
                    shitContainer.innerHTML = ''
                    shitsArray.forEach(function (shit) {
                    
                        shitContainer.innerHTML += makeShitDiv(shit)
                        shitContainer.innerHTML += makeTipsDiv(shit)
                    })
                })
        })
        // e.target.disabled = true
        // , { once: true }
        // e.target.removeEventListener('click', e)
        // e.target.removeEventListener('click', (e))
        // debugger
        // e.target.addEventListener('click', func)
        // function func() { 'Hi' }, { once: true }
        // debugger
    }
})

// Increment Tip Counter
// Select - Tip Count
// Listen - Add Tip Count
shitContainer.addEventListener('click', (e) => {
    if (e.target.className == "tip-button") {
        // Do - Increase Tip Count
        e.target.dataset.tipcount = parseInt(e.target.dataset.tipcount) + 1
        tipAdapter.fetchTip(e)
        .then(() => {
            shitAdapter.fetchShits()
                .then(function (shitsArray) {
                    shitsArray.sort(function (a, b) {
                        return b.shit_count - a.shit_count
                    })
                    shitContainer.innerHTML = ''
                    shitsArray.forEach(function (shit) {

                        shitContainer.innerHTML += makeShitDiv(shit)
                        shitContainer.innerHTML += makeTipsDiv(shit)
                    })
                })
        })
        // e.target.innerText = `💩 ${e.target.dataset.tipcount} ▲ `
    }
})