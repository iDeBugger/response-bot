import { injectable } from "inversify";
import { Env } from "..";
import { MessageUpdate } from "../entities/update";
import { TelegramService } from "../services/telegram.service";

@injectable()
export class WhoAmIInteractor {
	constructor(private telegramService: TelegramService) {}

	async execute(update: MessageUpdate, env: Env): Promise<void> {
		const {
			message: {
				chat: { id: chatId },
				from: { id: fromId },
			},
		} = update;
		const message = `ID пользователя: ${fromId}\nID чата: ${chatId}`;
		await this.telegramService.sendMessage(chatId, message, env);
	}
}
