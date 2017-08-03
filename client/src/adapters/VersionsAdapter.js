import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/v1'

class VersionsAdapter {
  static createVersion = (contentState, authorization) => {
    return axios.post(`${ROOT_URL}/versions`,
      {
        version: { contentState }
      },
      {
        headers: { authorization }
      }
    )
  }
}

export default VersionsAdapter
