let Input = ({
	name = "Input",
	label = true,
	floating = true,
	Input = null,
	type = "text",
	id = null,
	error = false,
	...props
}) => {
	name = name.replace(/(.)/, (e) => e.toUpperCase());
	id = id ? id : name.replace(/(.)/, (e) => e.toLowerCase());
	return (
		<div className={(floating ? "floating" : "") + (error ? " error" : "")}>
			{error ? <div className="error">{error}</div> : null}
			{Input ? (
				Input
			) : (
				<input name={id} id={id} placeholder={name} type={type} {...props} />
			)}
			{label ? <label htmlFor={id}>{name}</label> : null}
		</div>
	);
};

let Select = ({
	name = "Select",
	label = true,
	options = {},
	error = false,
	defaultOption = "Select",
	...props
}) => {
	name = name.replace(/(.)/, (e) => e.toUpperCase());
	let id = name.replace(/(.)/, (e) => e.toLowerCase());
	return (
		<div className={"input " + (error ? "error" : "")}>
			{error ? <div className="error">{error}</div> : null}
			<select name={id} id={id} {...props}>
				<option value="" disabled>
					{name}
				</option>
				{Object.entries(options).map(([e, key], id) => (
					<option
						key={"select-" + id + "-" + key}
						{...(!key && { disabled: true })}
						value={key}
					>
						{e}
					</option>
				))}
			</select>
			{label ? <label htmlFor={id}>{name}</label> : null}
		</div>
	);
};

export default Input;

export { Select };
