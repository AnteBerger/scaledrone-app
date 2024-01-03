import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { generateUsername } from '../utils/generateUsername';
import { MessagesForm } from './MessagesForm';

const ROOM_NAME = 'observable-room';
let drone = null;

export const Room = () => {
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [myProfile, setMyProfile] = useState({
        username: generateUsername(),
    });
    const messagesRef = useRef();
    messagesRef.current = messages;
    const membersRef = useRef();
    membersRef.current = members;
    const meRef = useRef();
    meRef.current = myProfile;

    function connectToChat() {
        drone = new window.Scaledrone(import.meta.env.VITE_SCALEDRONE_ID, {
            data: meRef.current,
        });
        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            meRef.current.id = drone.clientId;
            setMyProfile(meRef.current);
        });

        const room = drone.subscribe(ROOM_NAME);

        room.on('message', (message) => {
            const { data, member } = message;
            if (typeof data === 'object' && typeof data.typing === 'boolean') {
                const newMembers = [...membersRef.current];
                const index = newMembers.findIndex((m) => m.id === member.id);
                newMembers[index].typing = data.typing;
                setMembers(newMembers);
            } else {
                setMessages([...messagesRef.current, message]);
            }
        });
        room.on('members', (members) => {
            setMembers(members);
        });
        room.on('member_join', (member) => {
            setMembers([...membersRef.current, member]);
        });
        room.on('member_leave', ({ id }) => {
            const index = membersRef.current.findIndex((m) => m.id === id);
            const newMembers = [...membersRef.current];
            newMembers.splice(index, 1);
            setMembers(newMembers);
        });
    }

    useEffect(() => {
        drone === null && connectToChat();
    }, []);

    function onSendMessage(message) {
        drone.publish({
            room: ROOM_NAME,
            message,
        });
    }

    return <MessagesForm onSendMessage={onSendMessage} />;
};
