import { getUser } from "utils/fn/db";

let Ticket = ({ id, userPresent, user, ...props }) => {
	return (
		<main>
			<h1>Kibeho Sanctuary</h1>
			<h2>Here is your ticket ({id})</h2>
			{userPresent ? (
				<div>{JSON.stringify(user)}</div>
			) : (
				<div>User not found!</div>
			)}
			<div>{JSON.stringify(props)}</div>
		</main>
	);
};

let getStaticProps = async ({ params: { id, ...elseP } }) => {
	let userPresent = true;
	let user = await getUser(id).catch(() => (userPresent = false));
	return {
		props: { id, user, userPresent },
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
