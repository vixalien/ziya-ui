import Button from "components/button";

let homeBanner = ({ search = () => {} }) => {
	return (
		<>
			<div className="banner">
				<div className="container">
					<div className="image">
						<img />
					</div>
					<div className="text">
						<h1>Ni Karibu Client</h1>
						<p>
							<b>Godson Joint</b> is a digital media studio that produce
							creative contents for your music
						</p>
						<div className="buttons">
							<Button text="Search" onClick={search} />
							<Button text="Our Works" />
							<Button text="Hire Us" style="alt" />
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.banner {
					background-color: var(--secondarySystemBackground);
					padding: 20px;
					display: flex;
				}

				.container {
					display: flex;
					flex-direction: column;
					max-width: 800px;
					margin: auto;
				}

				.text {
					text-align: center;
				}

				.buttons {
					display: flex;
					flex-direction: column;
				}

				.image {
					margin: auto;
					border-radius: 50%;
					width: 1080px;
					height: 1080px;
					max-width: 200px;
					max-height: 200px;
					background-color: var(--systemFill);
				}

				@media screen and (min-width: 600px) {
					.container {
						flex-direction: row;
						max-width: 800px;
					}

					.buttons {
						margin: 30px auto;
					}

					.text {
						padding: 10px 20px;
					}
				}

				@media screen and (min-width: 700px) {
					.buttons {
						flex-direction: row;
					}
				}
			`}</style>
		</>
	);
};

export default homeBanner;
