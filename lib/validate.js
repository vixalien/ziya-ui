import validate from 'validate.js';
import constraints from './constraints';

validate.validators.presentIfCountryIs = (seemNull, value, key, parent, opts) => {
	if (parent && parent.country && parent.country == value) {
		if (!parent[key]) {
			return 'is required when country is ' + value
		}
	}
	return null;
};

validate.validators.presence.message = 'is required';

var pick = function(obj, props) {

	// Make sure object and properties are provided
	if (!obj || !props) return;

	// Create new object
	var picked = {};

	// Loop through props and push to new object
	props.forEach(function(prop) {
		picked[prop] = obj[prop];
	});

	// Return new object
	return picked;

};


let checkData = (key, value) => {
  if (!value) value = null;
  let error = validate( { [key] : value }, validate.cleanAttributes(constraints, { [key]: true}), { fullMessages: false })
  return error ? error[key][0] : false;
}

let checkInput = (key, value) => {
  let error = checkData(key, value);

  return error;
}

let parseInput = (input) => {
  return checkInput(input.name, input.value);
}

if (process.browser) window.validate = validate;

let checkAll = (object) => {
  let errors = validate(object, constraints, { fullMessages: false }) || {};
  return Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value[0]]))
}

export {checkData, checkInput, parseInput, checkAll, validate};;