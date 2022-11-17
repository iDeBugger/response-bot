/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// These initial Types are based on bindings that don't exist in the project yet,
// you can follow the links to learn how to implement them.

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Env {
	BOT_TOKEN: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { BOT_TOKEN } = env;

		try {
			const {
				message: {
					from: { id: userId },
					text,
				},
			} = (await request.json()) as any;

			await fetch(
				new Request(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat_id: userId,
						text,
					}),
				})
			);
		} catch (e) {
			console.error("Failed to parse JSON");
			console.error(e);
			return new Response("Not Ok");
		}

		console.log("300");

		return new Response("Ok");
	},
};
