import { z } from "zod";
import { Chat } from "./chat";
import { User } from "./user";

export interface Message {
	message_id: number;
	message_thread_id?: number | undefined;
	from: User;
	sender_chat?: Chat | undefined;
	date: number;
	chat: Chat;
	forward_from?: User | undefined;
	forward_from_chat?: Chat | undefined;
	forward_from_message_id?: number | undefined;
	forward_signature?: string | undefined;
	forward_sender_name?: string | undefined;
	forward_date?: number | undefined;
	is_topic_message?: boolean | undefined;
	is_automatic_forward?: boolean | undefined;
	reply_to_message?: Message | undefined;
	via_bot?: User | undefined;
	edit_date?: number | undefined;
	has_protected_content?: boolean | undefined;
	media_group_id?: string | undefined;
	author_signature?: string | undefined;
	text?: string | undefined;
}

export const Message: z.ZodType<Message> = z.lazy(() =>
	z.object({
		message_id: z.number().int(),
		message_thread_id: z.number().int().optional(),
		from: User,
		sender_chat: Chat.optional(),
		date: z.number().int(),
		chat: Chat,
		forward_from: User.optional(),
		forward_from_chat: Chat.optional(),
		forward_from_message_id: z.number().int().optional(),
		forward_signature: z.string().optional(),
		forward_sender_name: z.string().optional(),
		forward_date: z.number().int().optional(),
		is_topic_message: z.boolean().optional(),
		is_automatic_forward: z.boolean().optional(),
		reply_to_message: Message.optional(),
		via_bot: User.optional(),
		edit_date: z.number().int().optional(),
		has_protected_content: z.boolean().optional(),
		media_group_id: z.string().optional(),
		author_signature: z.string().optional(),
		text: z.string().optional(),
	})
);
