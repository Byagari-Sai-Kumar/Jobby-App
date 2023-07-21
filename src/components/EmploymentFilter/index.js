import './index.css'

const EmploymentFilter = props => {
  const {employmentDetails, updateEmploymentType} = props
  const {label, employmentTypeId} = employmentDetails

  const onClickEmploymentFilter = event => {
    updateEmploymentType(event.target.id)
  }

  return (
    <li className="employmentItem">
      <input
        type="checkBox"
        className="checkBox"
        id={employmentTypeId}
        onClick={onClickEmploymentFilter}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentFilter
