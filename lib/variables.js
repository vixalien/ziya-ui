let DB_URL = process.env.DB_URL;
let URL = "https://ziya-ui.vercel.app";

export default {
	"app_name": "ZIYA Kibeho",
	"url": URL,
	"links": {
		"ticket": URL + "/ticket/",
		"downloadTicket": URL + "/api/download-ticket.png?id="
	},
	"dbs": {
		"reservations": DB_URL + "/reservations-test2",
		"numbers": DB_URL + "/reservations-numbers-test2",
		"config": DB_URL + "/base-config"
	}
}
