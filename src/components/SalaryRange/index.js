import './index.css'

const SalaryRange = props => {
  const {salaryDetails, updateMinimumPackage} = props
  const {label, salaryRangeId} = salaryDetails

  const onClickSalaryRange = event => {
    updateMinimumPackage(event.target.id)
  }

  return (
    <li className="employmentItem">
      <input
        type="radio"
        id={salaryRangeId}
        name="selected"
        className="checkBox"
        onClick={onClickSalaryRange}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
