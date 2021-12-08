const ProfileStories = () => {
  return (
    <div className="flex items-center m-12">
      <div className="grid text-center mr-16">
        <img
          className="rounded-full w-20 h-20 flex ring-1 ring-gray-primary ring-offset-2 "
          src={`/images/defult.jpg`}
          alt={`stories pic`}
          onError={(e) => {
            e.target.src = `/images/defaultBg.png`;
          }}
        />
        <p className="font-semibold text-xs mt-3">. .</p>
      </div>
      <div className="grid text-center mr-16">
        <img
          className="rounded-full w-20 h-20 flex  ring-1 ring-gray-primary ring-offset-2 "
          src={`/images/defult.jpg`}
          alt={`stories pic`}
          onError={(e) => {
            e.target.src = `/images/defaultBg.png`;
          }}
        />
        <p className="font-semibold text-xs mt-3">. .</p>
      </div>
      <div className="grid text-center mr-16">
        <img
          className="rounded-full w-20 h-20 flex ring-1 ring-gray-primary ring-offset-2 "
          src={`/images/defult.jpg`}
          alt={`stories pic`}
          onError={(e) => {
            e.target.src = `/images/defaultBg.png`;
          }}
        />
        <p className="font-semibold text-xs mt-3">. .</p>
      </div>
    </div>
  );
};

export default ProfileStories;
