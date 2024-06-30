const BigCard = () => {
  return (
    <div className="bg-blue-600 text-white p-8 rounded-lg text-center flex items-center">
      <div className="flex flex-col text-start items-start">
        <h1 className="text-3xl font-bold mb-4">Download Our Application</h1>
        <p className="text-base mb-6 whitespace-pre-line w-1/2">
          Search, compare and book doctor consultations with ease. Order your
          medicines & get them delivered within 60 minutes. Track your steps
          count & earn points on hitting the daily goal.
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dh7osyxvl/image/upload/v1719283321/Medical%20Care%20System/pngwing.com_19_na3pny.png"
              alt="App Store"
              className="w-32"
            />
          </a>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dh7osyxvl/image/upload/v1719283401/Medical%20Care%20System/pngwing.com_21_tagr2f.png"
              alt="Google Play"
              className="w-32"
            />
          </a>
          <a
            href="https://appgallery.huawei.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dh7osyxvl/image/upload/v1719283515/Medical%20Care%20System/6220af92912013c51947f9d0_mjl1lu.png"
              alt="App Gallery"
              className="w-32"
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="https://appsmaventech.com/assets/Promotion_page/images/banner-img.png"
          alt="Vezeeta App"
          className=" rounded-lg"
        />
      </div>
    </div>
  );
};

export default BigCard;
