async function fetchPages() {
    try {
        const response = await fetch('./pages.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pages = await response.json();
        return pages;
    } catch (error) {
        console.error('Failed to fetch pages:', error);
        return null;
    }
}

function getCurrentPath() {
    console.log(window.location.pathname)
    return window.location.pathname.replace(".html", "");

}

function findPrevNextEntries(pages, currentPath) {
    let prev = null;
    let next = null;

    for (let i = 0; i < pages.length; i++) {
        if (pages[i].path === currentPath) {
            prev = pages[i - 1] || null;
            next = pages[i + 1] || null;
            break;
        }
    }

    return { prev, next };
}

function updateNavElements(prev, next) {
    const prevElement = document.getElementById('prev');
    const nextElement = document.getElementById('next');

    if (prev) {
        prevElement.innerHTML = `← ${prev.name}&nbsp;&nbsp;`;
        prevElement.href = prev.path
    } else {
        prevElement.textContent = '';
    }

    if (next) {
        nextElement.textContent = `${next.name} →`;
        nextElement.href = prev.path

    } else {
        nextElement.textContent = '';
    }
}

async function init() {
    const pages = await fetchPages();
    if (!pages) return;

    const currentPath = getCurrentPath();
    const { prev, next } = findPrevNextEntries(pages, currentPath);
    updateNavElements(prev, next);
}

init();