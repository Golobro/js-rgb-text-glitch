function $(id){return document.getElementById(id)}
function qs(elm){return document.querySelector(elm)}
function qsa(elms){return document.querySelectorAll(elms)}
function creaElm(elm, elmClass){
    let node = document.createElement(elm)
    elmClass ? node.setAttribute('class', elmClass) : 0
    return node
}