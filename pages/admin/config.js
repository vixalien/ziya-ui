import Head from "next/head";
import { useState, Fragment as F } from "react";
import PouchDB from "pouchdb";

import Input from "components/input";
import Notif from "public/notif.js";

import loadConfig from "utils/fn/loadConfig.js";
import handlers from "utils/configHandlers.js";

export default function Home({ dates, places: defaultPlaces, ...props }) {
	let [formDates, setDates] = useState(dates);
	let [noPlaces, setPlaces] = useState(defaultPlaces);
	let [RN, setNow] = useState(Date.now());
	if (process.browser) window.dates = formDates;
	if (process.browser) window.Notif = Notif;

	let {
		handleAddTime,
		handleRemoveTime,
		handleAddDate,
		handleRemoveDate,
		handlePlacesSubmit,
		handleFinalSubmit,
		handleGenerate,
	} = handlers(formDates, setDates, RN, setNow, noPlaces, setPlaces);

	let places;

	let parseTime = (time) => {
		if (typeof time == "object") {
			return [Object.values(time)[0], Object.keys(time)[0]];
		} else {
			return [noPlaces, time];
		}
	};
	return (
		<main>
			<Head>
				<title>Kibeho Sanctuary</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Kibeho Sanctuary</h1>
			<h2>Configuration</h2>
			<h3>Default number of places</h3>
			<form onSubmit={handlePlacesSubmit}>
				<Input
					name={"Default number of places (" + noPlaces + ")"}
					id="defaultPlaces"
					placeholder={defaultPlaces}
					autocomplete="off"
				/>
				<div className="check-div">
					<input name="keep" id="keep" type="checkbox" />
					<label>Keep current elements as is</label>
				</div>
				<div className="btn-bag">
					<button className="outline">Apply</button>
				</div>
			</form>
			<div className="btn-bag-tb">
				<div className="btn-bag">
					<button className="block" onClick={handleFinalSubmit}>
						Save
					</button>
				</div>
				<div className="btn-bag">
					<button onClick={handleGenerate}>Generate for this week</button>
				</div>
			</div>
			<div style={{ display: "none" }}>
				Last updated: {RN}
				<br />
				Dates: {JSON.stringify(formDates)}
			</div>
			<h3>Dates and Times</h3>
			<div>
				<table>
					<thead>
						<tr>
							<th>Dates</th>
							<th>Times</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>
								<label className="th">New Date</label>
							</th>
							<td>
								<form className="add-row" onSubmit={handleAddDate}>
									<input type="text" placeholder="Time" type="date" />
									<button className="add" />
								</form>
							</td>
						</tr>
						{Object.entries(formDates).map(([date, times], id) => (
							<tr key={"td-" + id}>
								<th>
									<label className="th">
										{new Date(parseInt(date)).toDateString()}
										<span
											className="close"
											data-date={date}
											onClick={handleRemoveDate}
										/>
									</label>
								</th>
								<td data-date={date}>
									<form className="add-row" onSubmit={handleAddTime}>
										<input className="time" type="text" placeholder="Time" />
										<input
											className="participants"
											type="text"
											placeholder="Places"
											defaultValue={noPlaces}
										/>
										<button className="add" />
									</form>
									{times.map((time, id) => (
										<F key={"times-" + id}>
											{([places, time] = parseTime(time)) && null}
											<label data-time={time}>
												<div className="time">{time}</div>
												<div className="participants">({places})</div>
												<span className="close" onClick={handleRemoveTime} />
											</label>
										</F>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<style jsx global>{`
				table label {
					display: flex;
					padding: 0.35em 0.5em;
					border-top: 1px solid #000;
					flex-wrap: wrap;
				}
				label.th {
					border-top: 0;
				}
				.add-row {
					display: flex;
					backdrop-filter: saturate(180%) blur(20px);
					background-color: rgba(224, 224, 224, 0.7);
				}
				.add-row input {
					min-width: 150px;
					margin-bottom: 0;
					backdrop-filter: none;
					background-color: transparent;
				}
				.add-row button {
					padding: 0.35em 0.5em;
					margin: 0.5em;
					font-size: 1em;
				}
				.add-row button::after {
					display: none;
				}
				.close,
				.add {
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					width: 1.5em;
					height: 1.5em;
					border: 0;
					display: -webkit-inline-flex;
					display: -moz-inline-box;
					display: inline-flex;
					margin: auto;
					margin-right: 0;
					outline: 0;
					cursor: pointer;
					-moz-transition: 0.3s;
					transition: 0.3s;
					background-position: center;
					background-repeat: no-repeat;
					background-size: 1rem;
				}
				.close {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmlvbmljb25zLXY1LW08L3RpdGxlPjxwb2x5Z29uIHBvaW50cz0iNDAwIDE0NS40OSAzNjYuNTEgMTEyIDI1NiAyMjIuNTEgMTQ1LjQ5IDExMiAxMTIgMTQ1LjQ5IDIyMi41MSAyNTYgMTEyIDM2Ni41MSAxNDUuNDkgNDAwIDI1NiAyODkuNDkgMzY2LjUxIDQwMCA0MDAgMzY2LjUxIDI4OS40OSAyNTYgNDAwIDE0NS40OSIvPjwvc3ZnPg==);
				}
				.add {
					background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmlvbmljb25zLXY1LWE8L3RpdGxlPjxsaW5lIHgxPSIyNTYiIHkxPSIxMTIiIHgyPSIyNTYiIHkyPSI0MDAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCIvPjxsaW5lIHgxPSI0MDAiIHkxPSIyNTYiIHgyPSIxMTIiIHkyPSIyNTYiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCIvPjwvc3ZnPg==);
				}

				/* New table layout */
				table {
					table-layout: fixed;
					max-width: 600px;
					min-width: 400px;
				}
				tr > th {
					vertical-align: top;
				}
				label.th {
					padding: 0.5em 1em;
				}
				table form,
				table label {
					max-width: 300px;
				}
				label > div {
					display: flex;
					flex: 1;
				}
				.add-row {
					border: 1px solid #000;
				}
				.add-row input {
					min-width: 0;
					border-right: 1px solid #000;
				}
				label:first-of-type {
					border-top: 0;
				}
				.participants {
					text-align: right;
					display: block;
				}
				.close,
				.add {
					margin: auto 0 auto 0.5em;
				}
				label.th .close {
					margin: auto;
					margin-right: 0;
				}

				/* Other */
				.check-div {
					display: flex;
				}
				input[type="checkbox"] {
					font-size: 1.5em;
					border: 1px solid;
					cursor: pointer;
					display: flex;
					margin: auto 10px auto 0;
				}
			`}</style>
		</main>
	);
}

export async function getServerSideProps() {
	return {
		props: await loadConfig(),
	};
}
