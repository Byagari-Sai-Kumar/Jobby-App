import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileData: '', profileStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profileSuccessContainer">
        <img src={profileImageUrl} alt="profile" className="profileImage" />
        <h1 className="profileName">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <button type="button" className="retryButton" onClick={this.getProfileData}>
      Retry
    </button>
  )

  getProfileData = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  renderProfileViews = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case 'IN_PROGRESS':
        return this.renderProfileLoading()
      case 'SUCCESS':
        return this.renderProfileSuccess()
      case 'FAILURE':
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileViews()
  }
}

export default Profile
