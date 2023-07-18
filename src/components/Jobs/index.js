import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Cookies} from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentFilter from '../EmploymentFilter'
import SalaryRange from '../SalaryRange'
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
    // eslint-disable-next-line
    jobsList: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    // eslint-disable-next-line
    const {employmentType, minimumPackage, search} = this.state

    const jwtToken = Cookies.get('jwtToken')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
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

  renderJobsView = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
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
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
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
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
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
