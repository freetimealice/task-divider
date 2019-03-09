import React from 'react'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      CLIENT_ID:
        '753347256543-5d2e80v12j13j3aut8nhvta7206fnk9e.apps.googleusercontent.com',
      API_KEY: 'AIzaSyBvbu9nYc3pTo8ejy8R641bW3Md_Jl3uxM',
      DISCOVERY_DOCS: [
        'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'
      ],
      SCOPES: 'https://www.googleapis.com/auth/tasks.readonly',
      loaded: false
    }
  }

  loadGapi() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      console.log('loading...')
      this.handleClientLoad()
    }
    document.body.appendChild(script)
  }

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad = () => {
    console.log('hi')
    gapi.load('client:auth2', this.initClient)
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */

  initClient = async () => {
    console.log('in initClient')
    const {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} = this.state
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })

    console.log('i am here')

    var authorizeButton = document.getElementById('authorize_button')
    var signoutButton = document.getElementById('signout_button')

    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    authorizeButton.addEventListener('click', this.handleAuthClick)
    signoutButton.addEventListener('click', this.handleSignoutClick)
  }

  updateSigninStatus = isSignedIn => {
    console.log('updateSigninStatus')
    var authorizeButton = document.getElementById('authorize_button')
    var signoutButton = document.getElementById('signout_button')
    if (isSignedIn) {
      authorizeButton.style.display = 'none'
      signoutButton.style.display = 'block'
      this.listTaskLists()
    } else {
      authorizeButton.style.display = 'block'
      signoutButton.style.display = 'none'
    }
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = event => {
    console.log('in handleAuthClick')
    gapi.auth2.getAuthInstance().signIn()
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = event => {
    gapi.auth2.getAuthInstance().signOut()
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre = message => {
    console.log('in append')
    var pre = document.getElementById('content')
    var textContent = document.createTextNode(message + '\n')
    pre.appendChild(textContent)
  }

  /**
   * Print task lists.
   */
  listTaskLists = async () => {
    console.log('hi')
    let response = await gapi.client.tasks.tasklists.list({
      maxResults: 10
    })

    this.appendPre('Task Lists:')
    var taskLists = response.result.items
    if (taskLists && taskLists.length > 0) {
      for (var i = 0; i < taskLists.length; i++) {
        var taskList = taskLists[i]
        this.appendPre(taskList.title + ' (' + taskList.id + ')')
      }
      console.log('taskList', response.result)
    } else {
      this.appendPre('No task lists found.')
    }
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.loadGapi()
    } else {
      console.log('loaded')
    }
  }

  render() {
    return (
      <div>
        <button type="submit" id="authorize_button">
          Authorize!
        </button>
        <button type="submit" id="signout_button">
          Signout!
        </button>
        <div id="content" />
        <div id="result" />
      </div>
    )
  }
}

export default Upload
