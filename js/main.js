let glitchTextInput = $('glitch_text')
let glitchStrength = $('glitch_strength')
let strength = $('strength')
let textModal = qs('.text-modal')
let textSource = qs('.text-wrap h1')
let selectModes = qsa('select')
let bgOverlay = qs('.bg')

// Buttons
let changeTextBtn = $('changeText')
let fontCaps = qsa('.font-caps button')
let closeModalBtn = qs('.text-modal span.close')

// RGB Glitch css keyframes access
let rgbGlitchAnimation = ([...document.styleSheets[1].rules])
let glitchInitStrength = rgbGlitchAnimation.find(glitch => glitch.name == 'rgbGlitch')[0]['style']['left'].replace('px', '')

// RGB Text styles Extract
let rgbText = ([...document.styleSheets[1].rules])
let redText = rgbText.find(rgb => rgb.selectorText == '.text-wrap h1')['style']
let blueText = rgbText.find(rgb => rgb.selectorText == '.text-wrap h1::after')['style']
let greenText = rgbText.find(rgb => rgb.selectorText == '.text-wrap h1::before')['style']

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
glitchStrength.value = glitchInitStrength  
strength.innerText = glitchStrength.value

// Control Glitch Strength
glitchStrength.addEventListener('input', function(){
    let glitchValue = this.value

    // Show slider value on UI
    strength.innerText = glitchValue

    // Control css keyFrame with range slider
    rgbGlitchAnimation.forEach(glitches => {
        // Check to see if keyframes css
        // is avaiable in your styles
        if(glitches.name == 'rgbGlitch'){
            // loop through css rules
            ([...glitches.cssRules]).forEach(glitch => {
                if(glitch.keyText === '0%'){
                    setGlitchStrength(glitch, 'left', glitchValue)
                    setGlitchStrength(glitch, 'top', -glitchValue)
                } else if(glitch.keyText === '50%'){
                    setGlitchStrength(glitch, 'top', glitchValue)
                } else if (glitch.keyText === '100%'){
                    setGlitchStrength(glitch, 'left', -glitchValue)
                }
            })
        }
    })
})

function setGlitchStrength(elm, cssProp, glitch){
    elm.style[cssProp] = glitch + 'px'
}

// Populate Select tag with options values
selectModes.forEach(selectMode => {
    createOptions(blendModes, selectMode)
    selectMode.addEventListener('change', e => {
        let mode = e.target.value
        // Filter Modes based on select id
        if(e.target.id === 'red'){
            setBlendMode(redText, mode)
        } else if(e.target.id === 'green'){
            setBlendMode(greenText, mode)
        } else {
            setBlendMode(blueText, mode)
        }
    })
})

function setBlendMode(elm, mode){
    elm.setProperty('mix-blend-mode', mode)
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
    if(parent.id === 'red'){
        parent.value = redText.mixBlendMode
    } else if (parent.id === 'green') {
        parent.value = greenText.mixBlendMode
    } else {
        parent.value = blueText.mixBlendMode
    }
}

// Open change Text Modal
changeTextBtn.addEventListener('click', () => {
    getElmClass(bgOverlay, 'add', 'bgShow')
    getElmClass(textModal, 'add', 'showTextControl')
    getElmClass(textModal, 'rmv', 'hideTextControl')
    glitchTextInput.focus()
})

// Close change Text Modal
closeModalBtn.addEventListener('click', () => {
    getElmClass(bgOverlay, 'rmv', 'bgShow')
    getElmClass(textModal, 'rmv', 'showTextControl')
    getElmClass(textModal, 'add', 'hideTextControl')
})

function getElmClass(elm, classAction, cssClass){
    if(classAction === 'add'){
        elm.classList.add(cssClass)
    } else if (classAction === 'rmv'){
        elm.classList.remove(cssClass)
    }
}

glitchTextInput.addEventListener('input', e => {
    // Set text to user input
    textSource.dataset.glitch = e.target.value
    textSource.innerText = e.target.value

    // Add default text
    // when user leaves input empty
    if(e.target.value == ''){
        textSource.innerText = 'Glitch'
        textSource.dataset.glitch = 'Glitch'
    }
})

// Change Font case
fontCaps.forEach(cap => {
    cap.addEventListener('click', () => {
        textSource.style.textTransform = cap.id
    })
})

// Close text modal when ENTER is pressed
glitchTextInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        getElmClass(bgOverlay, 'rmv', 'bgShow')
        getElmClass(textModal, 'add', 'hideTextControl')
    }
})