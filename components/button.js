let Button = ({ text, size = "flow", style = "block", ...props }) => {
	return (
		<>
			<div className={size + " " + style}>
				<button className="invertTheme" {...props}>
					{text}
				</button>
			</div>
			<style jsx>{`
				button {
					transition: 0.3s;
					width: auto;
					padding: 5px 20px;
					font-size: 18px;
					border-radius: 20px;
					cursor: pointer;
					outline: 0;
					box-shadow: none;
					flex: 1;
					margin: auto;
					border: 2px solid var(--systemBackground);
					color: var(--label);
				}

				.block button {
					background-color: var(--systemBackground);
				}

				.alt button {
					background-color: transparent;
					color: var(--darkText);
				}

				button:active,
				button:hover {
					box-shadow: 0 0 0 3px var(--separator);
				}

				div {
					margin: 5px;
					display: flex;
					width: auto;
					text-align: center;
					flex: 1;
				}

				.flow button {
					max-width: 500px;
				}
			`}</style>
		</>
	);
};

export default Button;
