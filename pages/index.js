import Head from "next/head";
import { withRouter } from "next/router";
import { useState } from "react";
import PouchDB from "pouchdb";
import getRawBody from "raw-body";

import Input, { Select } from "components/input";
import Places from "components/places";

import { parseInput, checkAll } from "lib/validate";
import constraints from "lib/constraints";

export default function Home({
	defaultValues: defaults,
	defaultErrors = {},
	messages = [],
}) {
	let form;
	let [errors, setErrors] = useState({ ...defaultErrors });
	let [country, setCountry] = useState("Rwanda");

	if (process.browser) window.checkAll = checkAll;

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

	if (process.browser) window.PouchDB = PouchDB;

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

	if (process.browser) window.errors = errors;

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
				<div key={"message-" + id}>Message: {e}</div>
			))}
			<form
				ref={(el) => (form = el)}
				onSubmit={handleSubmit}
				onChange={handleKeyUp}
				method="POST"
			>
				<h3>Contact Info</h3>
				<input name="submitted" type="hidden" value="true" />
				<Input
					name="Names"
					defaultValue={defaults.names}
					placeholder="Full Names"
					error={errors.names}
				/>
				<Input
					name="Email"
					defaultValue={defaults.email}
					type="email"
					placeholder="email@example.rw"
					error={errors.email}
				/>
				<Input
					name="Phone"
					defaultValue={defaults.phone}
					type="tel"
					placeholder="0788892020"
					error={errors.phone}
				/>
				<Select
					name="Gender"
					defaultValue={defaults.gender}
					options={toObject(["Male", "Female"])}
					error={errors.gender}
				/>
				<h3>Location details</h3>
				<Select
					name="Country"
					defaultValue={defaults.country}
					defaultValue=""
					options={toObject(["Rwanda", "Other"])}
					onChange={(e) => setCountry(e.target.value)}
				/>
				{country == "Rwanda" ? (
					<Places values={defaults} errors={errors} />
				) : country == "Other" ? (
					<Input
						name="Specify"
						defaultValue={defaults.specific_country}
						id="specific_country"
						placeholder="Specify your country"
						error={errors.specific_country}
					/>
				) : (
					""
				)}
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

export async function getServerSideProps({ query, req }) {
	let defaults = { province: "", district: "", sector: "" };
	if (req.method == "POST") {
		const body = await getRawBody(req);
		let obj = {
			...defaults,
			...Object.fromEntries(new URLSearchParams(body.toString()).entries()),
		};

		let errors =
			!!Object.entries(obj).length && obj.submitted ? checkAll(obj) : {};
		delete obj.submitted;

		let messages = [];

		let db = new PouchDB(process.env.DB_URL + "/reservations-test");

		if (isPresent(errors)) {
			messages.push("Check for errors then try again");
		} else {
			await db
				.post({ ...obj, time: Date.now() })
				.then(() => messages.push("Created account"))
				.catch((err) => {
					messages.push("An unexpected error happened!: " + err);
				});
		}
		return {
			props: {
				defaultErrors: errors,
				defaultValues: isPresent(errors) ? obj : defaults,
				messages,
			},
		};
	}
	return { props: { defaultErrors: {}, defaultValues: {}, messages: [] } };
}
