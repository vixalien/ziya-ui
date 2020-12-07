export default {
	names: {
		presence: true,
		length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
	},
	email: {
		presence: true,
		email: true
	},
	phone: {
		presence: true,
		format: {
			pattern: /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
			message: "is not a valid phone number"
		}
	},
	gender: {
		presence: true
	},
	country: {
		presence: true,
	},
	province: {
		presentIfCountryIs: "Rwanda"
	},
	district: {
		presentIfCountryIs: "Rwanda"
	},
	sector: {
		presentIfCountryIs: "Rwanda"
	},
	specific_country: {
		presentIfCountryIs: "Other"
	}
}