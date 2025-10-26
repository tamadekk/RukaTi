const ProfileCard = ({
  user,
}: {
  user: { name: string; location: string; description: string; avatar: string };
}) => (
  <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-2">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1 text-center sm:text-left">
        <div className="text-lg md:text-xl font-semibold">{user.name}</div>
        <div className="text-gray-500 text-sm">{user.location}</div>
      </div>
      <button className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium text-sm">
        Edit Profile
      </button>
    </div>
    <div className="text-gray-600 text-sm mt-2 text-center sm:text-left">
      {user.description}
    </div>
  </div>
);

export default ProfileCard;
