import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/v1'

class VersionsAdapter {
  static createVersion = (data, token) => {
    console.log(token)
    return axios.post(`${ROOT_URL}/versions`, {
      headers: {
        authorization: token
      },
      body: data
    })
  }
}

export default VersionsAdapter
