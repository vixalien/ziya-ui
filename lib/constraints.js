export default {
	names: {
		presence: true,
		length: {
			minimum: 6,
			message: "is too short",
		},
	},
	email: {
		presence: true,
		email: true,
	},
	phone: {
		presence: true,
		format: {
			pattern: /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
			message: "is not a valid phone number",
		},
	},
	gender: {
		presence: true,
	},
	country: {
		presence: true,
	},
	province: {
		presentIfCountryIs: "Rwanda",
	},
	district: {
		presentIfCountryIs: "Rwanda",
	},
	sector: {
		presentIfCountryIs: "Rwanda",
	},
	specific_country: {
		presentIfCountryIs: "Other",
	},
	date: {
		presence: true,
	},
	time: {
		presence: true,
	},
	noPeople: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0,
			lessThan: 11,
			message: "must be a number less than 10 and atleast 1"
		},
	},
};
