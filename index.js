// Select
let newShitFormContainer = document.getElementById('new-shit-form-container')
let shitContainer = document.getElementById('shit-container')
const shitAdapter = new ShitAdapter("http://quitshit-backend.herokuapp.com/shits")
const tipAdapter = new TipAdapter("http://quitshit-backend.herokuapp.com/tips")

// Display Add Shit Form
newShitFormContainer.innerHTML = shitForm()
function shitForm() {
    return `
      <form class="add-shit-form" id="shit-form">
        <input type="text" name="name" value="">
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
                shitContainer.innerHTML += makeShitDiv(shit)
                shitContainer.innerHTML +=  makeTipsDiv(shit)
            })
    }
})

// Display Shits & Tips
shitAdapter.fetchShits()
    .then(function (shitsArray) {
        shitsArray.forEach(function (shit) {
            shitContainer.innerHTML += makeShitDiv(shit)
            shitContainer.innerHTML += makeTipsDiv(shit)
        })
    })
function makeShitDiv(shit) {
    return `
    <div id=shit-${shit.id}>
        <div id=shit-${shit.id}-details>
            <h3>${shit.name}</h3>
        </div>
    </div>
    `
}
function makeTipsDiv(shit) {
    return `
    <div id=shit-${shit.id}-tips>
        ${tipForm(shit.id, shit)}
        <ul id=shit-${shit.id}-tips-list>
            ${shit.tips.map(makeTipLi).join("")}
        </ul>
    </div>
    `
}
function makeTipLi(tip) {
    return `<li>${tip.description}</li>`
}

// Display Add Tip Form
function tipForm(shit_id, shit) {
    return `
      <form class="add-tip-form" id="${shit_id}-tip-form">
        <input type="text" name="description" value="">
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
