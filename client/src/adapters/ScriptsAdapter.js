import axios from 'axios'
import { EditorState, convertToRaw } from 'draft-js'
import cuid from 'cuid'

const ROOT_URL = 'http://localhost:3000/api/v1'

class ScriptsAdapter {
  static createScript = ({ title, editor, password, confirmPassword }) => {
    const contentState = EditorState.createEmpty().getCurrentContent()
    const rawContentState = convertToRaw(contentState)
    const json = JSON.stringify(rawContentState)
    const data = {
      script: { title, password, confirmPassword, cuid: cuid() },
      editor: {name: editor},
      version: {contentState: json}
    }
    return axios.post(`${ROOT_URL}/scripts`, data)
  }

  static getScript = (cuid) => {
    const data = { cuid }
    return axios.get(`${ROOT_URL}/scripts/${cuid}`, data)
  }
}

export default ScriptsAdapter
