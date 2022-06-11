const main = document.getElementById('main');

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
    createCard(res, url)
  })
}

document.getElementById('add-new-site-btn').addEventListener('click', (e) => {
  e.preventDefault()
  addNewSite()
  window.location.reload()
})

document.getElementById('reload').addEventListener('click', () => {
  window.location.reload()
})

setInterval(() => {
  location.reload();
},(1000 * 60) * 10)