const drawer = document.querySelector('#guide-content')
const contents = document.querySelector('#contents')
const config = {attributes: false, childList: true, subtree: true}

let contentsLength = 0
let links = []

function createMask(): HTMLElement {
    const mask = document.createElement('div')
    mask.setAttribute(
        'style',
        'position: absolute; width: 100%; height: 100%;' +
        'background-color: rgba(0, 0, 0, 0.8); z-index: 301;'
    )
    return mask;
}

function createShowButton(): HTMLButtonElement {
    const button = document.createElement('button')
    button.setAttribute('id', 'rb-show')
    button.setAttribute(
        'style',
        'position: absolute; top: 50%; left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'background-color: rgba(255, 255, 255, 0.3); z-index: 302;'
    )
    button.innerHTML = 'Show'
    return button;
}

function bleachContent(e: Element) {
    const thumbnail = e.querySelector('ytd-thumbnail')
    const avatar = e.querySelector('#avatar-link')
    thumbnail.setAttribute('style', 'visibility: hidden;')
    avatar.setAttribute('style', 'visibility: hidden;')
    if (e.querySelector('#rb-show') == null) {
        const button = createShowButton()
        const mask = createMask()
        button.addEventListener('click', () => {
            thumbnail.removeAttribute('style')
            avatar.removeAttribute('style')
            e.removeChild(button)
            e.removeChild(mask)
        })
        e.append(mask, button)
    }
}

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
            bleachContent(e)
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
