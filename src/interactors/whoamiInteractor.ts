import { Context, Filter } from "grammy";

export default {
	async execute(ctx: Filter<Context, "message:text">): Promise<void> {
		const message = `Ваш ID: ${ctx.from.id}\nID группы: ${ctx.chat.id}`;
		ctx.api.sendMessage(ctx.chat.id, message);
	},
};
