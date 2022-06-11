const { contextBridge } = require('electron')
const axios = require('axios').default
const x = './img/red-x.png';
const check = './img/green-check.png';
const statusCodes = [
  { 
    code: 100,
    name: 'Continue', 
  },
  {
    code: 101,
    name: 'Switching Protocols',
  },
  {
    code: 103,
    name: 'Early Hints',
  },
  {
    code: 200,
    name: 'OK',
  },
  {
    code: 201,
    name: 'Created',
  },
  {
    code: 202,
    name: 'Accepted',
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
  },
  {
    code: 204,
    name: 'No Content',
  },
  {
    code: 205,
    name: 'Reset Content',
  },
  {
    code: 206,
    name: 'Partial Content',
  },
  {
    code: 300,
    name: 'Multiple Choices',
  },
    {
    code: 301,
    name: 'Moved Permanently',
  },
  {
    code: 302,
    name: 'Found',
  },
  {
    code: 303,
    name: 'See Other',
  },
  {
    code: 304,
    name: 'Not Modified',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
  },
  {
    code: 308,
    name: 'Permanent Redirect',
  },
  {
    code: 400,
    name: 'Bad Request',
  },
  {
    code: 401,
    name: 'Unauthorized',
  },
  {
    code: 403,
    name: 'Forbidden',
  },
  {
    code: 404,
    name: 'Not Found',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
  },
  {
    code: 406,
    name: 'Not Acceptable',
  },
  {
    code: 407,
    name: 'Proxy Authentication Required',
  },
  {
    code: 408,
    name: 'Request Timeout',
  },
  {
    code: 409,
    name: 'Conflict',
  },
  {
    code: 410,
    name: 'Gone',
  },
  {
    code: 411,
    name: 'Length Required',
  },
  {
    code: 412,
    name: 'Precondition Failed',
  },
  {
    code: 413,
    name: 'Payload Too Large',
  },
  {
    code: 414,
    name: 'URI Too Long',
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
  },
  {
    code: 417,
    name: 'Expectation Failed',
  },
  {
    code: 418,
    name: 'I\'m a teapot',
  },
  {
    code: 426,
    name: 'Upgrade Required',
  },
  {
    code: 428,
    name: 'Precondition Required',
  },
  {
    code: 429,
    name: 'Too Many Requests',
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
  },
  {
    code: 500,
    name: 'Internal Server Error',
  },
  {
    code: 501,
    name: 'Not Implemented',
  },
  {
    code: 502,
    name: 'Bad Gateway',
  },
  {
    code: 503,
    name: 'Service Unavailable',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
  },
  {
    code: 505,
    name: 'HTTP Version Not Supported',
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
  },
  {
    code: 510,
    name: 'Not Extended',
  },
  {
    code: 511,
    name: 'Network Authentication Required',
  }
]
const createCard = (res, urlObj) => {
  const url = urlObj
  const statusCard = document.createElement('div');
  const id = url.name.replace('.', '-');
  statusCard.setAttribute('id', id);
  statusCard.classList.add('status-card');
  const status = res.status;
  const statusName = statusCodes.find(code => code.code === status).name;
  const siteName = url.name;
  const siteUrl = url.url;
  const time = res.end - res.start;
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
  bottomText.innerText = `${siteUrl} | ${status}-${statusName} | ${time}ms`;
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
}
const getStatus = async (urlObj) => {
  let obj = {}
  obj.start = getTime()
  const response = await axios.get(urlObj.url).then(res => {
    obj.status = res.status
    obj.end = getTime()
  })
  return obj
  
}
const getTime = () => {
  return new Date().getTime()
}
contextBridge.exposeInMainWorld('createCard', createCard)
contextBridge.exposeInMainWorld('statusCodes', statusCodes)
contextBridge.exposeInMainWorld('getTime', getTime)
contextBridge.exposeInMainWorld('getStatus', getStatus)
contextBridge.exposeInMainWorld('axios', axios)