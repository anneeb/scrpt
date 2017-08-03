import axios from 'axios'
import cuid from 'cuid'
import NewScriptJson from './NewScriptJson'

const ROOT_URL = 'http://localhost:3000/api/v1'

class ScriptsAdapter {
  static createScript = ({ title, editor, password, confirmPassword }) => {
    const data = {
      script: { title, password, confirmPassword, cuid: cuid() },
      editor: {name: editor},
      version: {contentState: NewScriptJson}
    }
    return axios.post(`${ROOT_URL}/scripts`, data)
  }

  static getScript = (cuid) => {
    const data = { cuid }
    return axios.get(`${ROOT_URL}/scripts/${cuid}`, data)
  }
}

export default ScriptsAdapter
