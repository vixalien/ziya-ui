import { useEffect, useState } from "react";
import qrcode from "qrcode";
import { getUser } from "utils/fn/db";

import { SubmitButton } from "components/index"
import Card from "components/card"

let Ticket = ({ id, userPresent, user = {}, code, ...props }) => {
	return (
		<main>
			<h1>Kibeho Sanctuary</h1>
			<h2>Ticket</h2>
			<div className="btn-bag"><a href="/">&larr; Register as attende</a></div>
			{userPresent ?
				<div>
					<Card code={code} user={user} />
					<a href={"/api/download-ticket.png?id="+user._id}><SubmitButton text="Download Ticket"/></a>
				</div>:
				<div>ID not found!</div>
			}
		</main>
	);
};

let btoa = (str) => Buffer.from(str).toString('base64');

let getStaticProps = async ({ params: { id, ...elseP } }) => {
	let userPresent = true;
	let user = await getUser(id).catch(() => (userPresent = false));
	let code = "";
	if (userPresent) code = await qrcode.toString("https://ziya-ui.vercel.app/ticket/"+id, { type: "svg" });
	console.log("code: ", code);
	// if (userPresent) code = await qrcode.toDataURL("https://ziya-ui.vercel.app/ticket/"+id);
	return {
		props: { id, user, userPresent, code },
	};
};

let getStaticPaths = () => {
	return {
		paths: [{ params: { id: "a" } }],
		fallback: true,
	};
};

export { getStaticProps, getStaticPaths };
export default Ticket;
