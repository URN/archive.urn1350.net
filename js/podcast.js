
function render(episode, slug, cfg) {
    var container = document.createElement('div');
    container.classList.add('my-2');
    container.classList.add('col-12');
    container.classList.add('mx-auto');
    container.classList.add('Box');
    container.id = episode.slug;

    var img = "";
    if (episode["has-image"]) {
        img = `${cfg.upstream}/${slug}/${episode.slug}.jpg`;
    } else {
        img = `${cfg.upstream}/${slug}.jpg`;
    }
    container.innerHTML = `
    <div class="d-flex flex-column flex-md-row flex-items-center flex-md-items-center">
    <div class="col-2 d-flex flex-items-center flex-items-center flex-md-items-start">
      <img class="width-full avatar mb-2 mb-md-0" src="${img}" alt="episode logo" />
    </div>
    <div class="col-12 col-md-10 d-flex flex-column flex-justify-center flex-items-center flex-md-items-start pl-md-4">
      <h1 class="text-normal lh-condensed">${episode.name}</h1>
      <audio controls><source src="${cfg.upstream}/${slug}/${episode.slug}.mp3" type="audio/mpeg"></audio>
        <p>${episode.description}</p>
    </div>
  </div>
    `

    document.querySelector('#podcast-container').appendChild(container);
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    const cfg = await (await fetch('/config.json')).json();
    console.log(cfg);


    const hstp = await (await fetch(`${cfg.upstream}/${slug}.json`)).json();
    console.log(hstp);
    document.querySelector('#title').innerHTML = hstp.name;
    document.querySelector('#descripton').innerHTML = hstp.description;
    document.querySelector('#logo').src = `${cfg.upstream}/${slug}.jpg`;
    document.querySelector('title').innerHTML = hstp.name;


    hstp.episodes.map(episode => render(episode, slug, cfg));

}

init();
