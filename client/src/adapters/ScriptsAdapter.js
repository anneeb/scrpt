import axios from 'axios'
import cuid from 'cuid'
import contentState from './NewScriptJson'

const ROOT_URL = 'http://localhost:3000/api/v1'

class ScriptsAdapter {
  static createScript = ({ title, name, password, confirmPassword }) => {
    return axios.post(`${ROOT_URL}/scripts`, {
      script: { title, password, confirmPassword, cuid: cuid() },
      editor: { name },
      version: { contentState }
    })
  }

  static getScript = (cuid) => {
    return axios.get(`${ROOT_URL}/scripts/${cuid}`, { cuid })
  }
}

export default ScriptsAdapter
