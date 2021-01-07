import qrcode from "qrcode";
import sharp from "sharp";
import { renderToString } from "react-dom/server";

import { SVG } from "components/card";

import { getReservation } from "utils/fn/db";

import variables from "lib/variables";

let btoa = (str) => Buffer.from(str).toString("base64");

export default async (req, res) => {
	let id = req.body.id || req.query.id;
	if (id) {
		let reservationPresent = true;
		let reservation = await getReservation(id).catch(
			() => (reservationPresent = false)
		);
		if (reservationPresent) {
			let code = await qrcode.toString(variables.links.ticket + id, {
				type: "svg",
			});

			let svg = renderToString(<SVG reservation={reservation} code={code} />);

			// Generate high quality images
			svg = svg.replace(
				`width="645" height="330"`,
				`width="${645 * 3}" height="${330 * 3}"`
			);

			res.setHeader(
				"Content-disposition",
				"attachment; filename=ZIYA_Ticket_" + reservation._id + ".png"
			);
			res.statusCode = 200;
			res.setHeader("Content-type", "image/png");
			res.send(await sharp(Buffer.from(svg)).png());
		} else {
			res.statusCode = 404;
			res.json({ ok: false, error: "No reservation was found for this id" });
		}
	} else {
		res.statusCode = 400;
		res.json({ ok: false, error: "ID is not present" });
	}
};
