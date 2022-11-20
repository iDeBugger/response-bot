import { z } from "zod";

export const Chat = z.object({
	id: z.number().int(),
	type: z.enum(["private", "group", "supergroup", "channel"]),
	title: z.string().optional(),
	username: z.string().optional(),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	is_forum: z.boolean().optional(),
});

export type Chat = z.infer<typeof Chat>;
