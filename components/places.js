import { useState, useEffect } from "react";

import { Select } from "components/form-input";

import Places from "lib/places.json";


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
	let provinces = generateProvinces();
	let [districts, setDistricts] = useState({});
	let [sectors, setSectors] = useState({});

	let handleProvinceChange = e => {
		setDistricts(generateDistricts(e.target.value));
	};

	let handleDistrictChange = e => {
		setSectors(generateSectors(e.target.value));
	};

	return (
		<div>
			<Select
				name="Province"
				defaultValue={values.province}
				error={errors.province}
				options={provinces}
				autoComplete="address-level1"
				onChange={handleProvinceChange}
			/>
			<Select
				name="District"
				defaultValue={values.district}
				error={errors.district}
				options={districts}
				autoComplete="address-level2"
				onChange={handleDistrictChange}
			/>
			<Select
				name="Sector"
				defaultValue={values.sector}
				error={errors.sector}
				options={sectors}
				autoComplete="address-level3"
			/>
		</div>
	);
};

export default PlaceInputs;
