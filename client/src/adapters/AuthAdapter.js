import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/v1'

class AuthAdapter {
  static logIn = ({ editor, password, cuid }) => {
    const data = {
      script: {
        cuid,
        password
      },
      editor: {name: editor}
    }
    return axios.post(`${ROOT_URL}/auth`, data)
  }

  static checkAuth = () => {
    return axios.get(`${ROOT_URL}/me`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  }

}

export default AuthAdapter
