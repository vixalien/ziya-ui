import { useEffect, useState } from "react";
import qrcode from "qrcode";
import { getReservation } from "utils/fn/db";

import { SubmitButton } from "components/index";
import Card from "components/card";

import variables from "lib/variables";

let Ticket = ({ id, reservationPresent, reservation = {}, code, ...props }) => {
	return (
		<main>
			<h1>Kibeho Sanctuary</h1>
			<h2>Ticket</h2>
			<div className="btn-bag">
				<a href="/">&larr; Register as attende</a>
			</div>
			{reservationPresent ? (
				<div>
					<Card code={code} reservation={reservation} />
					<a
						href={variables.links.downloadTicket + reservation._id}
						download={"ZIYA_Ticket_" + reservation._id + ".png"}
					>
						<SubmitButton text="Download Ticket" />
					</a>
				</div>
			) : (
				<div>ID not found!</div>
			)}
		</main>
	);
};

let btoa = (str) => Buffer.from(str).toString("base64");

let getStaticProps = async ({ params: { id, ...elseP } }) => {
	let reservationPresent = true;
	let reservation = await getReservation(id).catch(
		() => (reservationPresent = false)
	);
	let code = "";
	if (reservationPresent)
		code = await qrcode.toString(variables.links.ticket + id, { type: "svg" });
	// if (reservationPresent) code = await qrcode.toDataURL("https://ziya-ui.vercel.app/ticket/"+id);
	return {
		props: { id, reservation, reservationPresent, code },
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
