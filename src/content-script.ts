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
}

const observer = new MutationObserver(cb)
observer.observe(drawer, config)
