import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/v1'

class AuthAdapter {
  static logIn = ({ name, password, cuid }) => {
    return axios.post(`${ROOT_URL}/auth`, {
      script: { cuid, password },
      editor: { name }
    })
  }

  static checkAuth = (authorization) => {
    return axios.get(`${ROOT_URL}/me`, {
      headers: { authorization }
    })
  }

}

export default AuthAdapter
