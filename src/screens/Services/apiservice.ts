
// import axios from 'axios'
// import handleError from './API/HandleApiErrors';
// import { Config } from './API/ApiConfiguration';
// const instance = axios.create({
//   baseURL: Config.API_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000,
// })

// instance.interceptors.response.use(
//   response => response,
//   ({ message, response: { data, status } }) => {
//     return handleError({ message, data, status })
//   },
// )

// export default instance





import axios from 'axios'
import handleError from './API/HandleApiErrors';
import { Config } from './API/ApiConfiguration';
const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 80000,
})

instance.interceptors.response.use(
  response => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status })
  },
)

export default instance
