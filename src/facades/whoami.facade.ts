import { injectable } from "inversify";
import { Env } from "..";
import { isMessageUpdate, Update } from "../entities/update";
import { WhoAmIInteractor } from "../interactors/whoAm.interactor";
import { Facade } from "./facadeTypes";

@injectable()
export class WhoAmIFacade implements Facade {
	constructor(private whoamiInteractor: WhoAmIInteractor) {}

	isProcessable(update: Update): boolean {
		return isMessageUpdate(update) && !!update.message.from;
	}

	async process(update: Update, env: Env) {
		if (isMessageUpdate(update)) {
			await this.whoamiInteractor.execute(update, env);
		}
	}
}
