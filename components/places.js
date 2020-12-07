import Places from "lib/places.json";
import { Select } from "./input";

import { useState } from "react";

let provinces = () => {
	let all = [["Province", ""]];
	all.push(...Places.provinces.map((name) => [name, name]));
	return Object.fromEntries(all);
}

let districts = (province = "all") => {
	let all = [["District", ""]];
	Object.entries(Places.districts).forEach(district => {
		if ((province == "all") || (district[0] == province.toString())) {
			all.push(...district[1].map((name) => [name, name]))
		}
	});
	return Object.fromEntries(all.sort());
}

let sectors = (district = "all") => {
	let all = [["Sector", ""]];
	Object.entries(Places.sectors).forEach(sector => {
		if ((district == "all") || (sector[0] == district.toString())) {
			all.push(...sector[1].map((name) => [name, name]))
		}
	});
	return Object.fromEntries(all.sort());
}

let PlaceInputs = ({ errors = {}, values = {} }) => {
	let [ province, setProvince ] = useState("all");
	let [ district, setDistrict ] = useState("all");

	if (process.browser) window.errors = errors;

	return (
		<div>
			<Select name="Province" defaultValue={values.province} error={errors.province} options={provinces()} onChange={e => { setProvince(e.target.value)}} />
  		<Select name="District" defaultValue={values.district} error={errors.district} options={districts(province)} onChange={e => { setDistrict(e.target.value)}} />
  		<Select name="Sector" defaultValue={values.sector} error={errors.sector} options={sectors(district)} />
  	</div>
  );
}

export default PlaceInputs;