import { useState, useMemo, useEffect } from "react";
import { parseInput } from "lib/validate";

let withErrors = (Input) => ({ error: defaultError, onChange, ...props }) => {
	let [plainError, setError] = useState(defaultError);

	useEffect(() => setError(defaultError), [defaultError]);
	let error = useMemo(() => plainError, [plainError]);

	let handleChange = (event) => {
		if (onChange) onChange(event);
		
		let foundError = parseInput(event.target);

		setError(foundError ? foundError : null);

	};

	return <Input {...props} error={error} onChange={handleChange}/>;
}

export default withErrors;