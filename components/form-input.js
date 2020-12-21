import withErrors from "./withErrors";

import NativeInput, { Select as NativeSelect } from "./input";

let Input = withErrors(NativeInput);
let Select = withErrors(NativeSelect);

export default Input;

export { Select };