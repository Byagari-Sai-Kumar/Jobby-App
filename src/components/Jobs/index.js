import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentFilter from '../EmploymentFilter'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    minimumPackage: '',
    search: '',
    jobStatus: jobsApiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {employmentType, minimumPackage, search} = this.state
    const joinEmploymentType = employmentType.join()

    this.setState({jobStatus: jobsApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwtToken')

    const url = `https://apis.ccbp.in/jobs?employment_type=${joinEmploymentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const allJobs = data.jobs
      const updatedAllJobsData = allJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedAllJobsData,
        jobStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobStatus: jobsApiStatusConstants.failure})
    }
  }

  renderEmploymentType = () => (
    <ul className="unorderedFiltersContainer">
      {employmentTypesList.map(eachEmploymentType => (
        <EmploymentFilter
          employmentDetails={eachEmploymentType}
          key={eachEmploymentType.label}
          updateEmploymentType={this.updateEmploymentType}
        />
      ))}
    </ul>
  )

  renderSalaryRange = () => (
    <ul className="unorderedFiltersContainer">
      {salaryRangesList.map(eachSalaryRange => (
        <SalaryRange
          salaryDetails={eachSalaryRange}
          key={eachSalaryRange.salaryRangeId}
          updateMinimumPackage={this.updateMinimumPackage}
        />
      ))}
    </ul>
  )

  updateEmploymentType = employmentTypeId => {
    const {employmentType} = this.state

    const inputNotInList = employmentType.filter(
      eachItem => eachItem === employmentTypeId,
    )

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, employmentTypeId],
        }),
        this.getJobData,
      )
    } else {
      const filteredList = employmentType.filter(
        eachItem => eachItem !== employmentTypeId,
      )
      this.setState({employmentType: filteredList}, this.getJobData)
    }
  }

  updateMinimumPackage = currentSalary => {
    this.setState({minimumPackage: currentSalary}, this.getJobData)
  }

  onGetSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobData()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }

  renderJobSuccessView = () => {
    const {jobsList} = this.state
    const noJobs = jobsList.length === 0

    return noJobs ? (
      <div className="noJobsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobsImage"
        />
        <p className="noJobsHeading">No Jobs Found</p>
        <p className="noJobsPara">
          We could not find any jobs. Try other filters
        </p>
      </div>
    ) : (
      <ul className="jobsContainer">
        {jobsList.map(eachJobItem => (
          <JobCard key={eachJobItem.id} jobData={eachJobItem} />
        ))}
      </ul>
    )
  }

  renderJobFailureView = () => (
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
        onClick={this.getJobData()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case jobsApiStatusConstants.inProgress:
        return this.renderLoadingView()
      case jobsApiStatusConstants.success:
        return this.renderJobSuccessView()
      case jobsApiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobsContainer">
        <Header />
        <div className="jobsFilterAndListOverallContainer">
          <div className="section1">
            <div className="overallSearchContainer1">
              <input
                type="search"
                placeholder="Search"
                className="searchBox1"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.onSubmitSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profileContainer">
              <Profile />
            </div>
            <hr className="hrLine" />
            <h1 className="filterHeading">Type of Employment</h1>
            {this.renderEmploymentType()}
            <hr className="hrLine" />
            <h1 className="filterHeading">Salary Range</h1>
            {this.renderSalaryRange()}
          </div>
          <div className="section2">
            <div className="overallSearchContainer2">
              <input
                type="search"
                placeholder="Search"
                className="searchBox1"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.onSubmitSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
