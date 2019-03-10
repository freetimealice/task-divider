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
      SCOPES: 'https://www.googleapis.com/auth/tasks',
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

  handleClientLoad = () => {
    gapi.load('client:auth2', this.initClient)
  }

  initClient = async () => {
    const {CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES} = this.state
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })

    var authorizeButton = document.getElementById(
      `authorize_button${this.props.userNum}`
    )
    var signoutButton = document.getElementById(
      `signout_button${this.props.userNum}`
    )

    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    authorizeButton.addEventListener('click', this.handleAuthClick)
    signoutButton.addEventListener('click', this.handleSignoutClick)
  }

  updateSigninStatus = isSignedIn => {
    var authorizeButton = document.getElementById(
      `authorize_button${this.props.userNum}`
    )
    var signoutButton = document.getElementById(
      `signout_button${this.props.userNum}`
    )
    if (isSignedIn) {
      authorizeButton.style.display = 'none'
      signoutButton.style.display = 'block'
    } else {
      authorizeButton.style.display = 'block'
      signoutButton.style.display = 'none'
    }
  }

  handleAuthClick = event => {
    gapi.auth2.getAuthInstance().signIn()
  }

  handleSignoutClick = event => {
    gapi.auth2.getAuthInstance().signOut()
  }

  addTasks = async (userNum, tasks) => {
    let week = tasks[`UserNum: ${userNum}`][0].week

    tasks = tasks[`UserNum: ${userNum}`].map(task => ({
      title: task.name,
      notes: `Complete ${task.frequency} ${
        task.frequency > 1 ? 'times ' : 'time '
      }per week. Expected to take ${task.duration} minutes per time. ${
        task.notes
      }`,
      status: 'needsAction'
    }))
    let choresFolderId = await this.seekFolderId(`Chores - week ${week}`)

    tasks.forEach(async currTask => {
      let addedTasks = await gapi.client.tasks.tasks.insert({
        tasklist: choresFolderId,
        resource: currTask
      })
    })
    alert('Your tasks have been added!')
  }

  seekFolderId = async folderName => {
    let findFolder = await gapi.client.tasks.tasklists.list({
      maxResults: 10
    })
    let taskLists = findFolder.result.items
    let found = taskLists.filter(tasklist => tasklist.title === folderName)
    if (found.length) alert('Your tasks have already been added!')
    else {
      let create = await gapi.client.tasks.tasklists.insert({
        resource: {
          title: folderName
        }
      })
      return create.result.id
    }
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.loadGapi()
    }
  }

  render() {
    return (
      <div>
        <button type="submit" id={`authorize_button${this.props.userNum}`}>
          Authorize & add chores!
        </button>

        <div>
          <button
            type="submit"
            onClick={() => {
              this.addTasks(this.props.userNum, this.props.assignments)
            }}
          >
            Add Tasks
          </button>
        </div>
        <button type="submit" id={`signout_button${this.props.userNum}`}>
          Signout
        </button>
        <div id="result" />
      </div>
    )
  }
}

export default Upload
