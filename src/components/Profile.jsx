import { FaUser } from 'react-icons/fa';

export const Profile = ({ username, profileColor }) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <FaUser size={40} color={profileColor} />
            <h3 className="font-semibold text-lg">{username}</h3>
        </div>
    );
};
