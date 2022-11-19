import { Bot, webhookCallback } from "grammy";
import whoamiInteractor from "./interactors/whoamiInteractor";

export interface Env {
	BOT_TOKEN: string;
}

type UpdateHandler = ReturnType<typeof webhookCallback>;

let bot: Bot | null = null;
let updateHandler: UpdateHandler | null = null;

const initializeBot = (token: string): Bot => {
	const bot = new Bot(token);

	bot
		.on("message:text")
		.command("whoami", (ctx) => whoamiInteractor.execute(ctx));

	return bot;
};

const processRequest = async (
	request: Request,
	updateHandler: UpdateHandler
): Promise<Response> => {
	return new Promise((resolve) => {
		updateHandler(request.json(), (jsonResponse: unknown) => {
			const response = new Response(JSON.stringify(jsonResponse), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
			resolve(response);
		});
	});
};

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { BOT_TOKEN } = env;

		if (!bot || !updateHandler) {
			bot = initializeBot(BOT_TOKEN);
			updateHandler = webhookCallback(bot, "callback");
		}

		return processRequest(request, updateHandler);
	},
};
