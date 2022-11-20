import { z } from "zod";

export const User = z.object({
	id: z.number().int(),
	is_bot: z.boolean(),
	first_name: z.string(),
	last_name: z.string().optional(),
	username: z.string().optional(),
	language_code: z.string().optional(),
	is_premium: z.boolean().optional(),
	added_to_attachment_menu: z.boolean().optional(),
});

export type User = z.infer<typeof User>;
