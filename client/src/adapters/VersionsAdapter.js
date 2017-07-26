import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/v1'

class VersionsAdapter {
  static createVersion = (json, token) => {
    const data = {version: {contentState: json}}
    return axios.post(`${ROOT_URL}/versions`, data, {
      headers: {
        authorization: token
      }
    })
  }
}

export default VersionsAdapter
