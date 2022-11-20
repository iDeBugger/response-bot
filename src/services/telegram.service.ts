import { injectable } from "inversify";
import { Env } from "..";
import { Chat } from "../entities/chat";
import { Update } from "../entities/update";

@injectable()
export class TelegramService {
	static tag = Symbol.for(TelegramService.name);

	private async makeTelegramRequest(
		env: Env,
		method: string,
		body: object
	): Promise<void> {
		const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`;
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	}

	parseUpdate(json: unknown): Update {
		return Update.parse(json);
	}

	async sendMessage(
		chat_id: Chat["id"],
		text: string,
		env: Env
	): Promise<void> {
		await this.makeTelegramRequest(env, "sendMessage", {
			chat_id,
			text,
		});
	}
}
