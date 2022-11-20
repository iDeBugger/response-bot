import { Env } from "..";
import { Update } from "../entities/update";

export interface Facade {
	isProcessable(update: Update): boolean;
	process(update: Update, env: Env): Promise<void>;
}
