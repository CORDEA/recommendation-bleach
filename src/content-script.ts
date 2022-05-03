const drawer = document.querySelector('#guide-content')
const config = {attributes: false, childList: true, subtree: true}

const cb = function (_, __) {
    const sections = document.querySelector('#sections')
    if (sections == null || sections.children.length <= 1) {
        return;
    }
    const channels = sections.children[1].querySelectorAll('#endpoint')
    const links = [];
    channels.forEach((e) =>
        links.push(e.getAttribute('href')));

    const contents = document.querySelector('#contents')
    const list = contents.querySelectorAll('#content')
    list.forEach((e) => {
        const link = e.querySelector('#avatar-link')
        const href = link.getAttribute('href')
        if (links.indexOf(href) < 0) {
            e.setAttribute('style', 'display: none;')
        }
    })
}

const observer = new MutationObserver(cb)
observer.observe(drawer, config)
