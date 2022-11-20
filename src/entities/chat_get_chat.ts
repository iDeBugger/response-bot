import { z } from "zod";
import { ChatPermissions } from "./chat_permissions";
import { Message } from "./message";

export const ChatGetChat = z.object({
	// photo: ChatPhoto,
	active_usernames: z.array(z.string()).optional(),
	emoji_status_custom_emoji_id: z.string().optional(),
	bio: z.string().optional(),
	has_private_forwards: z.boolean().optional(),
	has_restricted_voice_and_video_messages: z.boolean().optional(),
	join_to_send_messages: z.boolean().optional(),
	join_by_request: z.boolean().optional(),
	description: z.string().optional(),
	invite_link: z.string().optional(),
	pinned_message: Message.optional(),
	permissions: ChatPermissions.optional(),
	slow_mode_delay: z.number().int().optional(),
	message_auto_delete_time: z.number().int().optional(),
	has_protected_content: z.boolean().optional(),
	sticker_set_name: z.string().optional(),
	can_set_sticker_set: z.boolean().optional(),
	linked_chat_id: z.number().int().optional(),
	// location: ChatLocation
});

export type ChatGetChat = z.infer<typeof ChatGetChat>;
