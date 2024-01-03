import { parseTmestampToDateString } from '../utils/parseTimestampToDateString';

export const MessageList = ({ messages, currentUsername, members }) => {
    let isPreviousSenderSame = false;

    return (
        <div className="border-gray-300 rounded-md h-[40rem] border-2 p-3 w-full overflow-y-auto flex flex-col">
            {messages?.map((item, index) => {
                const isCurrentUser = item.member.clientData.username === currentUsername;
                if (index > 0 && item.member.clientData.username === messages[index - 1].member?.clientData.username) {
                    isPreviousSenderSame = true;
                } else {
                    isPreviousSenderSame = false;
                }
                const memberColor = members.find((m) => m.id === item.member.id)?.clientData.color;

                return (
                    <div
                        className={`mt-2 flex flex-col gap-2 ${isCurrentUser ? 'self-start' : 'self-end'}`}
                        key={item.id}
                    >
                        {!isPreviousSenderSame && (
                            <h3 className="font-semibold text-lg">{item.member?.clientData.username}</h3>
                        )}
                        <div className="flex justify-between">
                            <span className="text-sm font">{parseTmestampToDateString(item.timestamp)}</span>
                        </div>
                        <p
                            className="text-sm font-medium p-2 rounded-md"
                            style={{
                                backgroundColor: memberColor,
                            }}
                        >
                            {item.data}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
