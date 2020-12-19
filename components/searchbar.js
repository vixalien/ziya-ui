import { Fragment as F } from "react";

export default function Search({
	showCancel = false,
	onChange = () => {},
	onSubmit = () => {},
	onClear = () => {},
	onCancel = () => {},
	form = {},
	...props
}) {
	let input, searchBar;

	let handleChange = (ev) => {
		if (input.value.length > 0) {
			searchBar.classList.remove("empty");
		} else {
			if (!ev) searchBar.classList.add("empty");
		}
		console.log("value", input.value);
		onChange(input.value);
	};

	let clearSearch = () => {
		clearInput();
		onChange("");
		input.focus();
		onClear();
	};

	let cancelSearch = () => {
		clearInput();
		handleChange();
		onCancel();
	};

	let clearInput = () => {
		if (input) {
			input.value = "";
		}
	};

	let setInputRef = (r) => {
		input = r;
		if (input && searchBar) handleChange();
	};

	return (
		<>
			<div className="search-bar empty" ref={(e) => (searchBar = e)}>
				<form className="input" onSubmit={onSubmit} {...form}>
					<svg viewBox="0 0 512 512">
						<path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
					</svg>
					<input
						ref={setInputRef}
						placeholder="Search"
						onChange={handleChange}
						{...props}
					/>
					<svg
						className="clear"
						width="512"
						height="512"
						viewBox="0 0 512 512"
						onClick={clearSearch}
					>
						<path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" />
						<line
							x1="320"
							y1="320"
							x2="192"
							y2="192"
							style={{
								fill: "none",
								stroke: "var(--darkText)",
								strokeWidth: "32px",
							}}
						/>
						<line
							x1="192"
							y1="320"
							x2="320"
							y2="192"
							style={{
								fill: "none",
								stroke: "var(--darkText)",
								strokeWidth: "32px",
							}}
						/>
					</svg>
				</form>
				{showCancel ? (
					<a className="cancel" onClick={cancelSearch}>
						Cancel
					</a>
				) : null}
			</div>
			<style jsx>{`
				.search-bar {
					display: flex;
					width: 100%;
					max-width: auto;
					font-size: 17px;
					padding: 5px 0;
					color: var(--secondaryLabel);
				}

				.input {
					flex: 1;
					display: flex;
					height: 34px;
					background-color: var(--systemFill);
					border-radius: 5px;
					overflow: auto;
					padding: 0;
					backdrop-filter: saturate(180%) blur(20px);
				}

				input {
					flex: 1;
					border: 0;
					padding: 0;
					margin: auto 0;
					outline: 0;
					background-color: transparent;
					font-size: inherit;
					color: var(--secondaryLabel);
				}

				::-webkit-input-placeholder {
					color: var(--placeholderText);
				}

				.cancel {
					transition: 0.3s;
					padding-left: 5px;
					padding-right: 5px;
					margin: auto;
					width: 100%;
					max-width: max-content;
					overflow: hidden;
				}

				.search-bar.empty .cancel {
					width: 0;
					padding: 0;
				}

				svg {
					margin: auto 5px;
					width: 17px;
					height: 17px;
				}

				.clear {
					cursor: pointer;
				}

				.clear path {
					fill: #000;
				}

				.search-bar.empty .clear {
					display: none;
				}

				.search-bar svg path {
					fill: var(--secondaryLabel);
				}

				.search-bar.empty svg path {
					fill: var(--placeholderText);
				}

				svg path {
					transition: 0.3s;
				}
			`}</style>
		</>
	);
}
