import "reflect-metadata";
import { Container } from "inversify";
import { WhoAmIFacade } from "./facades/whoami.facade";
import { WhoAmIInteractor } from "./interactors/whoAm.interactor";
import { TelegramService } from "./services/telegram.service";
import { Facade } from "./facades/facadeTypes";
import { Update } from "./entities/update";

export interface Env {
	BOT_TOKEN: string;
}

const container = new Container();
container.bind<WhoAmIInteractor>(WhoAmIInteractor).toSelf();
container.bind<WhoAmIFacade>(WhoAmIFacade).toSelf();
container.bind<TelegramService>(TelegramService).toSelf();

const facades: Facade[] = [container.resolve(WhoAmIFacade)];

async function runInteractors(update: Update, env: Env) {
	for (const facade of facades) {
		if (facade.isProcessable(update)) {
			await facade.process(update, env);
		}
	}
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const rawUpdate = await request.json();
		const update = Update.parse(rawUpdate);
		await runInteractors(update, env);

		return new Response(null, {
			status: 200,
		});
	},
};
