import { useState, Fragment as F } from "react";

import Input, { Select } from "components/form-input";

import Places from "components/places"

let Messages = ({ messages, className = "" }) => {
	return messages.map((e, id) => (
		<div key={"message-" + id} className={"message "+(className)}>
			{e}
		</div>
	));
}

let Errors = ({ errors }) => {
	return <Messages messages={errors} className="error" />;
}

let SubmitButton = ({ text, ...props }) => {
	return <div style={{ margin: "40px 0 10px" }}>
		<button
			className="block"
			style={{
				width: "100%",
				margin: "0 0 100px 0",
				height: "35px",
				textAlign: "left",
			}}
			{...props}
		>
			{text} &rarr;
		</button>
	</div>
}

let Location = ({ defaults = {}, errors = {} }) => {
	let [ country, setCountry ] = useState(defaults.country);
	let toObject = (array) => Object.fromEntries(array.map((el) => [el, el]));

	return (
		<F>
			<Select 
				name="Country" 
				error={errors.country} 
				defaultValue={defaults.country} 
				options={toObject(["Rwanda", "Other"])}
				onChange={(e) => setCountry(e.target.value)}
			/>
			{country == "Rwanda" ?
				<Places values={defaults} errors={errors} /> : 
				(country == "Other" ? <Input
					name="Specify"
					defaultValue={defaults.specific_country}
					id="specific_country"
					placeholder="Specify your country"
					error={errors.specific_country}
				/> : null)
			}
		</F>
	);
}

export { Messages, Errors, SubmitButton, Location };