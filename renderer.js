// DOM Manipulation in this file
const main = document.getElementById('main');
const x = './red-x.png';
const check = './green-check.png';
// access data from preload.js with contextBridge.exposeInMainWorld()
const sites = Object.keys(localStorage)

const addNewSite = () => {
  const newSite = {
    name: document.getElementById('new-site-name').value,
    url: document.getElementById('new-site-url').value,
  }
  localStorage.setItem(newSite.name, JSON.stringify(newSite))
}

for (site in sites) {
  let url = JSON.parse(localStorage.getItem(sites[site]))
  getStatus(url).then(res => {
    const statusCard = document.createElement('div');
    const id = url.name.replace('.', '-');
    statusCard.setAttribute('id', id);
    statusCard.classList.add('status-card');
    const status = res.status;
    const statusName = statusCodes.find(code => code.code === status).name;
    const siteName = url.name;
    const siteUrl = url.url;
    const topDiv = document.createElement('div');
    topDiv.classList.add('top-div');
    const img = document.createElement('img');
    img.src = status === 200 ? check : x;
    img.alt = statusName;
    topDiv.appendChild(img);
    const topText = document.createElement('p');
    topText.classList.add('top-text');
    textLink = document.createElement('a');
    textLink.href = siteUrl;
    textLink.innerText = siteName;
    textLink.target = '_blank';
    topText.appendChild(textLink);
    topDiv.appendChild(topText);
    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-div');
    const bottomText = document.createElement('p');
    bottomText.classList.add('bottom-text');
    bottomText.innerText = `${siteUrl} - ${status} - ${statusName}`;
    bottomDiv.appendChild(bottomText)
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btn-div');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'Remove';
    deleteBtn.addEventListener('click', () => {
      localStorage.removeItem(siteName);
      statusCard.remove();
    })
    btnDiv.appendChild(deleteBtn);
    infoDiv.appendChild(topDiv);
    infoDiv.appendChild(bottomDiv);
    statusCard.appendChild(infoDiv);
    statusCard.appendChild(btnDiv)
    main.appendChild(statusCard);
    
  })
}

document.getElementById('add-new-site-btn').addEventListener('click', (e) => {
  e.preventDefault()
  addNewSite()
  window.location.reload()
});

document.getElementById('reload').addEventListener('click', () => {
  window.location.reload()
})

setInterval(() => {
  location.reload();
},(1000 * 60) * 10)