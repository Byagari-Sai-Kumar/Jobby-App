import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {IoBagCheck} from 'react-icons/io5'
import './index.css'

const SimilarJobCard = props => {
  const {jobData} = props
  const {
    similarCompanyLogoUrl,
    similarEmploymentType,
    similarJobDescription,
    similarJobLocation,
    similarJobTitle,
    similarRating,
  } = jobData

  return (
    <div className="similarJobsContainer2">
      <div className="LogoTitleSection">
        <img
          src={similarCompanyLogoUrl}
          alt="similar job company logo"
          className="companyLogo"
        />
        <div className="titleRatingContainer">
          <h1 className="titleText">{similarJobTitle}</h1>
          <div className="ratingStarContainer">
            <AiFillStar className="ratingStar" />
            <p className="ratingNumber">{similarRating}</p>
          </div>
        </div>
      </div>
      <p className="descriptionHeading">Description</p>
      <p className="description">{similarJobDescription}</p>
      <div className="overallLocationPackageContainer">
        <div className="locationSection">
          <FaMapMarkerAlt className="locationIcon" />
          <p className="locationPlace">{similarJobLocation}</p>
          <IoBagCheck className="locationIcon" />
          <p className="locationPlace">{similarEmploymentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
