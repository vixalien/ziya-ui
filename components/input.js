let Input = ({ name = "Input", Input = null, type = "text", id = null, error = false, ...props }) => {
	name = name.replace(/(.)/, e => e.toUpperCase());
	id = id ? id : name.replace(/(.)/, e => e.toLowerCase());
	return (
		<div className={"floating "+(error?"error":"")}>
      { error ? <div className="error">{error}</div> : null }
      { Input ? Input : <input name={id} id={id} placeholder={name} type={type} {...props}/> }
      <label htmlFor={id}>{name}</label>
    </div>
  )
}

let Select = ({ name = "Select", options = {}, error = false, defaultOption = "Select", ...props }) => {
	name = name.replace(/(.)/, e => e.toUpperCase());
	let id = name.replace(/(.)/, e => e.toLowerCase());
	return (
		<div className={"input "+(error?"error":"")}>
      { error ? <div className="error">{error}</div> : null }
			<select name={id} id={id} {...props}>
				{Object.entries(options).map(([e, key], id) => <option key={'select-'+id+'-'+key} {...(!key && {disabled:true})} value={key}>{e}</option>)}
			</select>
			<label htmlFor={id}>{name}</label>
		</div>
	)
}

export default Input;

export { Select };