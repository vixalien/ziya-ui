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

export { Messages, Errors, SubmitButton };