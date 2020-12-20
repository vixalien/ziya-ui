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

	let provinces = generateProvinces();
	let [districts, setDistricts] = useState({});
	let [sectors, setSectors] = useState({});

	let handleProvinceChange = e => {
		setProvince(e.target.value);
		setDistricts(generateDistricts(e.target.value));
	};

	let handleDistrictChange = e => {
		setDistrict(e.target.value);
		setSectors(generateSectors(e.target.value));
	};

	return (
		<div>
			<Select
				name="Province"
				defaultValue={values.province}
				error={errors.province}
				options={provinces}
				onChange={handleProvinceChange}
			/>
			<Select
				name="District"
				defaultValue={values.district}
				error={errors.district}
				options={districts}
				onChange={handleDistrictChange}
			/>
			<Select
				name="Sector"
				defaultValue={values.sector}
				error={errors.sector}
				options={sectors}
			/>
		</div>
	);
};

export default PlaceInputs;
