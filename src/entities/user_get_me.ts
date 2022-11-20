import { z } from "zod";
import { User } from "./user";

export const UserGetMe = z
	.object({
		can_join_groups: z.boolean().optional(),
		can_read_all_group_messages: z.boolean().optional(),
		supports_inline_queries: z.boolean().optional(),
	})
	.merge(User);

export type UserGetMe = z.infer<typeof UserGetMe>;
