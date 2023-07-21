import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {IoBagCheck} from 'react-icons/io5'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="jobCardLink">
      <li className="ListItem">
        <div className="jobCardOverallContainer">
          <div className="LogoTitleSection">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companyLogo"
            />
            <div className="titleRatingContainer">
              <h1 className="titleText">{title}</h1>
              <div className="ratingStarContainer">
                <AiFillStar className="ratingStar" />
                <p className="ratingNumber">{rating}</p>
              </div>
            </div>
          </div>
          <div className="overallLocationPackageContainer">
            <div className="locationSection">
              <FaMapMarkerAlt className="locationIcon" />
              <p className="locationPlace">{location}</p>
              <IoBagCheck className="locationIcon" />
              <p className="locationPlace">{employmentType}</p>
            </div>
            <div className="packageSection">
              <p className="packageNumber">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hrLine" />
          <h1 className="descriptionHeading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
