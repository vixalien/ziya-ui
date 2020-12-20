import Head from "next/head";
import { withRouter } from "next/router";
import { useState } from "react";

import Input, { Select } from "components/input";
import Places from "components/places";
import DateTime from "components/datetime";

import submit from "utils/fn/submit";
import loadConfig from "utils/fn/loadConfig";

import { parseInput, checkAll } from "lib/validate";

export default function Home({
	defaultValues: defaults,
	defaultErrors = {},
	messages = [],
	errors: messageErrors,
	dates,
}) {
	let form;
	let [errors, setErrors] = useState(defaultErrors);
	let [country, setCountry] = useState("Rwanda");

	let handleInput = (input) => {
		let error = parseInput(input);

		if (error) {
			setErrors({ ...errors, ...{ [input.name]: error } });
		} else {
			setErrors({ ...errors, ...{ [input.name]: null } });
		}

		return error;
	};

	let handleKeyUp = (event) => {
		// freeze and prevent Defaults for event
		event.persist();
		event.preventDefault();

		if (event.target.tagName == "INPUT" || event.target.tagName == "SELECT") {
			// If the event was a keyup on an input, validate that input only
			handleInput(event.target);
		}
	};

	let handleSubmit = (event) => {
		// freeze and prevent Defaults for event
		event = event.nativeEvent;

		let newErrors = checkAll(validate.collectFormValues(event.target));

		setErrors(newErrors);

		let invalid = false;
		Object.entries(newErrors).forEach(([value, key]) => {
			if (key) invalid = true;
		});

		if (invalid) event.preventDefault();
		console.log("is form invalid?: ", invalid);

		return !!newErrors;
	};

	let toObject = (array) => Object.fromEntries(array.map((el) => [el, el]));
	return (
		<main className="container">
			<Head>
				<title>Kibeho Sanctuary</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Kibeho Sanctuary</h1>
			<h2>Register as attendee</h2>
			{messages.map((e, id) => (
				<div key={"message-" + id} className="message">
					{e}
				</div>
			))}
			{messageErrors.map((e, id) => (
				<div key={"error-" + id} className="message error">
					{e}
				</div>
			))}
			<form
				ref={(el) => (form = el)}
				onSubmit={handleSubmit}
				onChange={handleKeyUp}
				method="POST"
			>
				<h3>Date</h3>
				<DateTime
					dates={dates}
					errors={errors}
					values={defaults}
				/>
				<h3>Contact Info</h3>
				<Input
					name="Names"
					defaultValue={defaults.names}
					placeholder="Full Names"
					autoComplete="name"
					error={errors.names}
				/>
				<Input
					name="Email"
					defaultValue={defaults.email}
					type="email"
					placeholder="email@example.rw"
					autoComplete="email"
					error={errors.email}
				/>
				<Input
					name="Phone"
					defaultValue={defaults.phone}
					type="tel"
					placeholder="0788892020"
					autoComplete="tel"
					error={errors.phone}
				/>
				<Select
					name="Gender"
					defaultValue={defaults.gender}
					options={toObject(["Male", "Female", "Other", "Unspecific"])}
					autoComplete="sex"
					error={errors.gender}
				/>
				<Input
					name="Total number of people"
					id="noPeople"
					defaultValue={defaults.noPeople || 1}
					type="number"
					error={errors.noPeople}
				/>
				<h3>Location details</h3>
				<Select
					name="Country"
					defaultValue={defaults.country}
					defaultValue=""
					options={toObject(["Rwanda", "Other"])}
					onChange={(e) => setCountry(e.target.value)}
					autoComplete="country"
					error={errors.country}
				/>
				{country == "Rwanda" ?
					<Places values={defaults} errors={errors} /> : 
					<Input
						name="Specify"
						defaultValue={defaults.specific_country}
						id="specific_country"
						placeholder="Specify your country"
						autoComplete="country"
						error={errors.specific_country}
					/>
				}
				<div style={{ margin: "40px 0 10px" }}>
					<button
						className="block"
						style={{
							width: "100%",
							margin: 0,
							height: "35px",
							textAlign: "left",
						}}
					>
						Next &rarr;
					</button>
				</div>
			</form>
		</main>
	);
}

let isPresent = (obj) => !!Object.entries(obj).length;

export async function getServerSideProps({ req }) {
	let defaults = {
		province: "",
		district: "",
		sector: "",
		date: "",
		time: "",
	};
	let returns = {},
		errors = [];
	if (req.method == "POST") {
		returns = await submit(req, defaults).catch((e) => {
			errors.push("An unexpected error occured: " + e.toString());
			return;
		});
	}
	let { dates, places } = await loadConfig();
	return {
		props: {
			defaultErrors: {},
			defaultValues: defaults,
			messages: [],
			errors,
			dates,
			places,
			...returns,
		},
	};
}
