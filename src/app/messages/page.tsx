import { MessagingThread } from "@/components/messages/mes";

export default function MessagesPage() {
    const threadId = 'cmdbvzrth0007u9acqgfmmxnq'; 
    const currentUserId = 'cmdbvzrs00001u9accnr0kxb0'; 
    const senderType = 'PROFESSIONAL'; 


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <MessagingThread threadId={threadId} currentUserId={currentUserId} senderType={senderType} />
        </div>
    );
}
