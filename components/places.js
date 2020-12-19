import Places from "lib/places.json";
import { Select } from "./input";

import { useState, useEffect } from "react";

let generateProvinces = () => {
	let all = [];
	all.push(...Places.provinces.map((name) => [name, name]));
	return Object.fromEntries(all);
};

let generateDistricts = (province = "all") => {
	let all = [];
	Object.entries(Places.districts).forEach((district) => {
		if (province == "all" || district[0] == province.toString()) {
			all.push(...district[1].map((name) => [name, name]));
		}
	});
	return Object.fromEntries(all.sort());
};

let generateSectors = (district = "all") => {
	let all = [];
	Object.entries(Places.sectors).forEach((sector) => {
		if (district == "all" || sector[0] == district.toString()) {
			all.push(...sector[1].map((name) => [name, name]));
		}
	});
	return Object.fromEntries(all.sort());
};

let PlaceInputs = ({ errors = {}, values = {} }) => {
	let [selectedProvince, setProvince] = useState("all");
	let [selectedDistrict, setDistrict] = useState("all");

	let [provinces, setProvinces] = useState(generateProvinces());
	let [districts, setDistricts] = useState({});
	let [sectors, setSectors] = useState({});

	useEffect(() => {
		setDistricts(generateDistricts(selectedProvince));
	}, [selectedProvince]);

	useEffect(() => {
		setSectors(generateSectors(selectedDistrict));
	}, [selectedDistrict]);

	return (
		<div>
			<Select
				name="Province"
				autoComplete="off"
				defaultValue={values.province}
				error={errors.province}
				options={provinces}
				onChange={(e) => {
					setProvince(e.target.value);
				}}
			/>
			<Select
				name="District"
				autoComplete="off"
				defaultValue={values.district}
				error={errors.district}
				options={districts}
				onChange={(e) => {
					setDistrict(e.target.value);
				}}
			/>
			<Select
				name="Sector"
				autoComplete="off"
				defaultValue={values.sector}
				error={errors.sector}
				options={sectors}
			/>
		</div>
	);
};

export default PlaceInputs;
