import { z } from "zod";

export const ChatPermissions = z.object({
	can_send_messages: z.boolean().optional(),
	can_send_media_messages: z.boolean().optional(),
	can_send_polls: z.boolean().optional(),
	can_send_other_messages: z.boolean().optional(),
	can_add_web_page_previews: z.boolean().optional(),
	can_change_info: z.boolean().optional(),
	can_invite_users: z.boolean().optional(),
	can_pin_messages: z.boolean().optional(),
	can_manage_topics: z.boolean().optional(),
});

export type ChatPermissions = z.infer<typeof ChatPermissions>;
