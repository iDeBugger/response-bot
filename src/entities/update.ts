import { z } from "zod";
import { Message } from "./message";

const UpdateId = z.number().nonnegative();

const MessageUpdate = z.object({ update_id: UpdateId, message: Message });
const EditedMessageUpdate = z.object({
	update_id: UpdateId,
	edited_message: Message,
});
const ChannelPostUpdate = z.object({
	update_id: UpdateId,
	channel_post: Message,
});
const EdiChannelPostUpdate = z.object({
	update_id: UpdateId,
	edited_channel_post: Message,
});

export const Update = z.union([
	MessageUpdate,
	EditedMessageUpdate,
	ChannelPostUpdate,
	EdiChannelPostUpdate,
]);

export function isMessageUpdate(update: Update): update is MessageUpdate {
	return Object.getOwnPropertyNames(update).includes("message");
}

export function isEditedMessageUpdate(
	update: Update
): update is EditedMessageUpdate {
	return Object.getOwnPropertyNames(update).includes("edited_message");
}

export function isChannelPostUpdate(
	update: Update
): update is ChannelPostUpdate {
	return Object.getOwnPropertyNames(update).includes("channel_post");
}

export function isEdiChannelPostUpdate(
	update: Update
): update is EdiChannelPostUpdate {
	return Object.getOwnPropertyNames(update).includes("edited_channel_post");
}

export type MessageUpdate = z.infer<typeof MessageUpdate>;
export type EditedMessageUpdate = z.infer<typeof EditedMessageUpdate>;
export type ChannelPostUpdate = z.infer<typeof ChannelPostUpdate>;
export type EdiChannelPostUpdate = z.infer<typeof EdiChannelPostUpdate>;
export type Update = z.infer<typeof Update>;
