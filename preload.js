// preload.js

const { contextBridge } = require('electron')
const axios = require('axios').default

// const urls = [
//   {name: 'acjokes.com', url: 'https://www.acjokes.com'},
//   {name: 'freezedrums.com', url: 'https://www.freezedrums.com'},
//   {name: 'escosnaps.com', url: 'https://www.escosnaps.com'},
//   {name: 'cabinasmanzanillo.com', url: 'https://www.cabinasmanzanillo.com'},
//   {name: 'acjres.com', url: 'https://www.acjres.com'},
//   {name: 'johnplate.com', url: 'https://www.johnplate.com'},
//   {name: 'shnoice.com', url: 'https://www.shnoice.com'},
//   {name: 'ericihle.com', url: 'https://www.ericihle.com'},
// ]

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


const getStatus = async (urlObj) => {
  const response = await axios.get(urlObj.url)
  return response
  
}



// links the renderer process to the main process

// contextBridge.exposeInMainWorld('results', results)
contextBridge.exposeInMainWorld('statusCodes', statusCodes)
// contextBridge.exposeInMainWorld('urls', urls)
contextBridge.exposeInMainWorld('getStatus', getStatus)
contextBridge.exposeInMainWorld('axiou', axios)

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.




