import { app_name } from "lib/variables";

import Link from "next/link";
import { Menu, User, Search } from "react-feather";

import Links from "components/nav_links";

export default function Appbar({ title = app_name }) {
	return (
		<>
			<nav className="appbar">
				<div className="icon menu">
					<Menu size={20} />
				</div>
				<div className="title">{title}</div>
				<Links />
				<div className="icon">
					<Search size={20} />
				</div>
				<div className="icon">
					<User size={20} />
				</div>
			</nav>
			<style jsx>{`
				nav {
					--label: #ffffffff;
					--systemBackground: #000000ff;
				}

				nav {
					background-color: var(--systemBackground);
					color: var(--label);
					display: flex;
					padding: var(--padding);
					width: 100%;
					min-height: 44px;
				}

				.title {
					flex: 1;
					text-align: center;
					margin: auto;
					font-size: 18px;
				}

				.icon {
					margin: auto 5px;
					height: 20px;
					width: 20px;
					display: block;
				}

				@media screen and (min-width: 600px) {
					.icon.menu {
						display: none;
					}

					.title {
						text-align: left;
						padding-left: 10px;
					}
				}

				@media screen and (max-width: 600px) {
					nav :global(.links) {
						display: none;
					}
				}
			`}</style>
		</>
	);
}
