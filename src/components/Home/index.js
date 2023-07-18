import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="homeBgContainer">
      <Header />
      <h1 className="homeHeading">Find The Job Thats Fits Your Life</h1>
      <p className="homePara">
        Millions of people are searching for jobs, salary, information and
        company reviews. Find the job thats fit your abilities and potential.
      </p>
      <button
        type="button"
        className="findJobsButton"
        onClick={onClickFindJobs}
      >
        Find Jobs
      </button>
    </div>
  )
}

export default Home
