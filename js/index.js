
function render(podcast, cfg) {
    var container = document.createElement('li');
    container.classList.add('d-inline-block');
    container.classList.add('col-2');
    container.classList.add('p-2');
    container.classList.add('m-3');
    container.classList.add('text-center');
    container.classList.add('Box');
    container.id = podcast.slug;

    container.innerHTML = `
    <a href="/podcast.html?slug=${podcast.slug}">
        <img class="width-full avatar" src="${cfg.upstream}/${podcast.slug}.jpg" alt="${podcast.slug}">
        <p class="f3-light">${podcast.name}</p>
    </a>
    <p class="f5-light overflow_hidden">${podcast.description}</p>
    `;

    document.querySelector('#podcasts').appendChild(container);
}

async function init() {
    const cfg = await (await fetch('/config.json')).json();
    console.log(cfg);


    const hstp = await (await fetch(`${cfg.upstream}/hstp.json`)).json();
    console.log(hstp.podcasts);

    hstp.podcasts.map(podcast => render(podcast, cfg));
}

init();
