let glitchTextInput = $('glitch_text')
let glitchStrength = $('glitch_strength')
let strength = $('strength')
let textModal = qs('.text-modal')
let textBG = qs('.text-wrap')
let textSource = qsa('.text-wrap h1')
let selectModes = qsa('select')
let bgOverlay = qs('.bg')

// Buttons
let addBg_Btn = $('add_BG')
let rmvBg_Btn = $('rmv_BG')
let changeTextBtn = $('changeText')
let fontCaps = qsa('.font-caps button')
let closeModalBtn = qs('.text-modal span.close')

// RGB Text
let redText = qs('.red')
let blueText = qs('.blue')
let greenText = qs('.green')

let blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
    'initail',
    'inherit',
    'unset'
]

// Set glitch strength to init load
strength.innerText = glitchStrength.value

// Control Glitch Strength
glitchStrength.addEventListener('input', function(){
    let glitchValue = this.value

    // Show slider value on UI
    strength.innerText = glitchValue

    setGlitchStrength(greenText, glitchValue)
    setGlitchStrength(blueText, -glitchValue)
})

function setGlitchStrength(elm, val){
    let blue = elm.className.includes('blue')

    elm.animate([
        // keyframes
        { top: '0', left: `${val}px` },
        { top: `${val}px`, left: '0' },
        { top: '0', left: `${-val}px` }
    ], {
        // timing options
        duration: 100,
        iterations: Infinity,
        direction: blue ? "alternate-reverse" : "alternate" 
    })
}

// Populate Select tag with options values
selectModes.forEach(selectMode => {
    createOptions(blendModes, selectMode)
    selectMode.addEventListener('change', e => {
        let mode = e.target.value
        let id = e.target.id

        // Filter Modes based on select id
        filterModes(id, 'red', redText, mode)
        filterModes(id, 'green', greenText, mode)
        filterModes(id, 'blue', blueText, mode)
    })
})

function filterModes(id, text, textElm, mode){
    id === text ? setBlendMode(textElm, mode) : 0
}

function setBlendMode(elm, mode){
    elm.style.mixBlendMode = mode
}

// Create options from blendModes Array
function createOptions(optionsList, parent){
    // Populate options with blendmodes array
    optionsList.forEach(optionList => {
        let opts = creaElm('option')
        opts.value = optionList
        opts.innerText = optionList
        parent.appendChild(opts)
    })

    // Load Current Settings
    loadCurrentSettings(parent, 'red', redText)
    loadCurrentSettings(parent, 'green', greenText)
    loadCurrentSettings(parent, 'blue', blueText)
}

function loadCurrentSettings(elm, text, textElm){
    elm.id === text ? elm.value = getTextBlendMode(textElm) : 0
}

function getTextBlendMode(elm){
    let blendMode = window.getComputedStyle(elm).mixBlendMode
    return blendMode
}

// Open change Text Modal
changeTextBtn.addEventListener('click', () => {
    getElementClass(bgOverlay, 'add', 'bgShow')
    getElementClass(textModal, 'add', 'showTextControl')
    getElementClass(textModal, 'rmv', 'hideTextControl')
    glitchTextInput.focus()
})

// Close change Text Modal
closeModalBtn.addEventListener('click', () => {
    getElementClass(bgOverlay, 'rmv', 'bgShow')
    getElementClass(textModal, 'rmv', 'showTextControl')
    getElementClass(textModal, 'add', 'hideTextControl')
})

function getElementClass(elm, classAction, cssClass){
    if(classAction === 'add'){
        elm.classList.add(cssClass)
    } else if (classAction === 'rmv'){
        elm.classList.remove(cssClass)
    }
}

glitchTextInput.addEventListener('input', e => {
    // Set text to user input
    let value = e.target.value
    let defaultText = 'Glitch'

    changeText(redText, value)
    changeText(blueText, value)    
    changeText(greenText, value)
    
    // Add default text
    // when user leaves input empty
    if(e.target.value == ''){
        changeText(redText, defaultText)
        changeText(blueText, defaultText)
        changeText(greenText, defaultText)
    }
})

function changeText(elm, text){
    elm.innerText = text
}

// Change Font case
fontCaps.forEach(cap => {
    cap.addEventListener('click', () => {
        changeTextFontCaps(textSource, cap.id)
    })
})

function changeTextFontCaps(elm, fontCap){
    elm.forEach(el => el.style.textTransform = fontCap)
}

addBg_Btn.addEventListener('click', () => {
    setElementDisplay(rmvBg_Btn, 'show')
    setElementDisplay(addBg_Btn, 'hide')
    getElementClass(textBG, 'add', 'addBG')
})

rmvBg_Btn.addEventListener('click', () => {
    setElementDisplay(rmvBg_Btn, 'hide')
    setElementDisplay(addBg_Btn, 'show')
    getElementClass(textBG, 'rmv', 'addBG')
})

function setElementDisplay(elm, display){
    display == 'hide' ? elm.style.display = 'none' : 0
    display == 'show' ? elm.style.display = 'inline' : 0
}

// Close text modal when ENTER is pressed
glitchTextInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        getElementClass(bgOverlay, 'rmv', 'bgShow')
        getElementClass(textModal, 'add', 'hideTextControl')
    }
})
