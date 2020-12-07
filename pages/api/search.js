// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
	let q = req.query.q;
	res.statusCode = 200;
	let allPages = {
		Home: "/",
		About: "/about",
		"Our Works,Projects,Portfolio": "/works",
		Shop: "/shop",
		"Contact Us": "/contact",
	};
	let results = Object.fromEntries(
		Object.entries(allPages)
			.filter(([key, val]) => {
				let matchAny = false;
				key.split(",").forEach((k) => {
					if (k.match(new RegExp(q, "gi"))) matchAny = true;
				});
				if (val.match(new RegExp(q, "gi"))) matchAny = true;
				return matchAny;
			})
			.map(([key, val]) => [key.split(",")[0], val])
	);
	if (Object.entries(results).length <= 0)
		results = {
			"No results found! Check your query or try an advanced search": "#",
		};
	res.json(results);
};
