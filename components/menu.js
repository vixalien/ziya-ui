import { useState, useRef, useEffect } from "react";

import { home_links } from "lib/variables";

import Links from "components/nav_links";
import Search from "components/searchbar";
import Modal from "components/base/modal";

import { X as Close, Loader } from "react-feather";

let Menu = ({ visible = false, onClose = () => {}, ...props }) => {
	let [showMenu, setShowMenu] = useState(visible);
	let [links, setLinks] = useState(home_links);
	let [spinner, setSpinner] = useState("none");

	let hideMenu = () => {
		setShowMenu(false);
		onClose();
	};

	let search = (val) => {
		let res;
		console.log("value lenght ", val.length);
		if (val.length > 0) {
			setSpinner("block");
			fetch("/api/search?q=" + val)
				// .then(e => { console.log("e: ", e); return e })
				.then((e) => {
					if (e.ok) e.json().then((e) => setLinks(e));
				})
				.then(() => setSpinner("none"))
				.catch(() => setSpinner("none"));
		} else {
			setLinks(home_links);
		}
	};

	useEffect(() => setShowMenu(visible), [visible]);

	return (
		<>
			<Modal visible={showMenu}>
				<div className="menu" {...props}>
					<div className="close-bar" onClick={hideMenu}>
						<Close size={24} />
						<span>Close</span>
						<Loader
							size={24}
							className="spinner"
							style={{ display: spinner }}
						/>
					</div>
					<div className="search-bar">
						<Search
							showCancel={true}
							onChange={search}
							onSubmit={() => console.log("Submit")}
							onCancel={() => console.log("Cancel")}
							onClear={() => console.log("Clear")}
						/>
					</div>
					<div className="links">
						<Links dir="col" links={links} />
					</div>
				</div>
			</Modal>
			<style jsx>{`
				.menu {
					--darkText: #000000ff;
					--label: #ffffffff;
					--secondaryLabel: #ebebf599;
					--placeholderText: #ebebf54c;
					--systemBackground: #000000ff;
					--systemFill: #7878805b;
				}
				.menu {
					color: var(--label);
					background-color: var(--systemBackground);
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				}
				.close-bar {
					padding: 10px 5px;
					display: flex;
					border-bottom: 1px solid;
				}
				.close-bar span {
					margin: auto 5px;
					flex: 1;
				}

				.search-bar {
					padding: 0 5px;
				}
				.links {
					flex-direction: column;
				}

				:global(.spinner) {
					animation-name: spinner;
					animation-duration: 1s;
					animation-iteration-count: infinite;
					animation-timing-function: linear;
				}

				@keyframes spinner {
					from {
						transform: rotate(0deg);
					}

					to {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</>
	);
};

let useMenu = () => {
	return Menu;
};

export default Menu;

export { useMenu };
