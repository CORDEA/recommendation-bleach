const drawer = document.querySelector('#guide-content')
const contents = document.querySelector('#contents')
const config = {attributes: false, childList: true, subtree: true}

let contentsLength = 0
let links = []

function bleach() {
    if (links.length <= 0) {
        return
    }
    const contents = document.querySelector('#contents')
    const list = contents.querySelectorAll('#content')
    if (list.length == contentsLength) {
        return
    }
    contentsLength = list.length
    list.forEach((e) => {
        const link = e.querySelector('#avatar-link')
        const href = link.getAttribute('href')
        if (links.indexOf(href) < 0) {
            e.setAttribute('style', 'display: none;')
        }
    })
}

new MutationObserver((_, __) => {
    const sections = document.querySelector('#sections')
    if (sections == null || sections.children.length <= 1) {
        return;
    }
    const channels = sections.children[1].querySelectorAll('#endpoint')
    channels.forEach((e) =>
        links.push(e.getAttribute('href')))

    bleach()
}).observe(drawer, config)

new MutationObserver((_, __) => {
    bleach()
}).observe(contents, config)
