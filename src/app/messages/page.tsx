import { MessagingThread } from "@/components/messages/mes";

export default function MessagesPage() {
    const threadId = 'cmdbvzrth0007u9acqgfmmxnq'; // from your message_threads table, looks good!
    const currentUserId = 'cmdbvzrs00001u9accnr0kxb0'; // professionalId from that thread row
    const senderType = 'PROFESSIONAL'; // fits with the professionalId user


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <MessagingThread threadId={threadId} currentUserId={currentUserId} senderType={senderType} />
        </div>
    );
}
