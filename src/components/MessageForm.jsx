import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export const MessageForm = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const onChange = (e) => {
        const text = e.target.value;
        setText(text);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setText('');
        onSendMessage(text);
    };

    return (
        <form className="grid grid-cols-4 gap-3 items-center border-2 border-gray-300 p-3" onSubmit={onSubmit}>
            <div className="col-span-3">
                <Input placeholder="Enter your message or press ENTER" value={text} onChange={onChange} />
            </div>
            <div className="col-span-1">
                <Button text="Send" />
            </div>
        </form>
    );
};
