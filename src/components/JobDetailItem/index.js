import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'
import {IoBagCheck} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailItem extends Component {
  state = {
    jobDetailsData: '',
    skillsData: [],
    similarJobsData: [],
    jobsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({jobsStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedJobDetailData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        jobLifeDescription: data.job_details.life_at_company.description,
        companyImage: data.job_details.life_at_company.image_url,
      }

      const updatedSkillsData = data.job_details.skills.map(eachSkill => ({
        skillImage: eachSkill.image_url,
        skillName: eachSkill.name,
      }))

      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob => ({
        similarCompanyLogoUrl: eachSimilarJob.company_logo_url,
        similarEmploymentType: eachSimilarJob.employment_type,
        similarId: eachSimilarJob.id,
        similarJobDescription: eachSimilarJob.job_description,
        similarJobLocation: eachSimilarJob.location,
        similarJobTitle: eachSimilarJob.title,
        similarRating: eachSimilarJob.rating,
      }))

      this.setState({
        jobDetailsData: updatedJobDetailData,
        skillsData: updatedSkillsData,
        similarJobsData: updatedSimilarJobsData,
        jobsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsStatus: apiStatusConstants.failure})
    }
  }

  similarJobsSuccessView = () => {
    const {jobDetailsData, skillsData, similarJobsData} = this.state

    return (
      <>
        <div className="similarJobsContainer">
          <div className="LogoTitleSection">
            <img
              src={jobDetailsData.companyLogoUrl}
              alt="job details company logo"
              className="companyLogo"
            />
            <div className="titleRatingContainer">
              <h1 className="titleText">{jobDetailsData.title}</h1>
              <div className="ratingStarContainer">
                <AiFillStar className="ratingStar" />
                <p className="ratingNumber">{jobDetailsData.rating}</p>
              </div>
            </div>
          </div>
          <div className="overallLocationPackageContainer">
            <div className="locationSection">
              <FaMapMarkerAlt className="locationIcon" />
              <p className="locationPlace">{jobDetailsData.location}</p>
              <IoBagCheck className="locationIcon" />
              <p className="locationPlace">{jobDetailsData.employmentType}</p>
            </div>
            <div className="packageSection">
              <p className="packageNumber">{jobDetailsData.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hrLine" />
          <div className="descriptionAndVisitLinkContainer">
            <p className="descriptionHeading">Description</p>
            <a href={jobDetailsData.companyWebsiteUrl} className="visit">
              <button className="visitLinkContainer" type="button">
                Visit
                <FaExternalLinkAlt />
              </button>
            </a>
          </div>
          <p className="description3">{jobDetailsData.jobDescription}</p>
          <p className="descriptionHeading2">Skills</p>
          <ul className="skillsOverallContainer">
            {skillsData.map(eachSkill => (
              <li className="skillsListContainer" key={eachSkill.skillName}>
                <img
                  src={eachSkill.skillImage}
                  alt={eachSkill.skillName}
                  className="skillsImage"
                />
                <p className="skillName">{eachSkill.skillName}</p>
              </li>
            ))}
          </ul>
          <p className="descriptionHeading2">Life at Company</p>
          <div className="lifeAtCompanyOverallContainer">
            <div className="descriptionContainer">
              <p className="description">{jobDetailsData.jobLifeDescription}</p>
            </div>
            <div className="jobLifeImageContainer">
              <img
                src={jobDetailsData.companyImage}
                alt="life at company"
                className="companyImage"
              />
            </div>
          </div>
        </div>
        <h1 className="similarJobsHeading">Similar Jobs</h1>
        <div className="similarJobsContainer3">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobCard
              key={eachSimilarJob.similarId}
              jobData={eachSimilarJob}
            />
          ))}
        </div>
      </>
    )
  }

  similarJobsFailureView = () => (
    <div className="jobsFailureViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureViewImage"
      />
      <p className="failureHeading">Oops! Something Went Wrong</p>
      <p className="failurePara">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failureRetryButton"
        onClick={this.getJobDetailsData()}
      >
        Retry
      </button>
    </div>
  )

  similarJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSimilarJobsCurrentViews = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case apiStatusConstants.inProgress:
        return this.similarJobsLoadingView()
      case apiStatusConstants.success:
        return this.similarJobsSuccessView()
      case apiStatusConstants.failure:
        return this.similarJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="similarJobsOverallBgContainer">
        <Header />
        {this.renderSimilarJobsCurrentViews()}
      </div>
    )
  }
}

export default JobDetailItem
