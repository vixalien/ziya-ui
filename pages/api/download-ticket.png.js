import qrcode from "qrcode";
import sharp from "sharp";
import { renderToString } from "react-dom/server";

import { SVG } from "components/card"

import { getUser } from "utils/fn/db";

let btoa = (str) => Buffer.from(str).toString('base64');

export default async (req, res) => {
	let id = req.body.id || req.query.id;
	if (id) {
		let userPresent = true;
		let user = await getUser(id).catch(() => (userPresent = false));
		if (userPresent) {
			let code = await qrcode.toString("https://ziya-ui.vercel.app/ticket/"+id, { type: "svg" });

			
			let svg = renderToString(<SVG user={user} code={code} />);

			// Generate high quality images
			svg = svg.replace(`width="645" height="330"`, `width="${645 * 3}" height="${330 * 3}"`);

			res.setHeader('Content-disposition', 'attachment; filename=ZIYA_Ticket_'+user._id+'.png');
			res.statusCode = 200;
			res.setHeader('Content-type', 'image/png');
			res.send(await sharp(Buffer.from(svg)).png());
			
		} else {
			res.statusCode = 404;
			res.json({ ok: false, error: "No user was found for this id" });
		}
	} else {
		res.statusCode = 400;
		res.json({ ok: false, error: "ID is not present" });
	}
};
