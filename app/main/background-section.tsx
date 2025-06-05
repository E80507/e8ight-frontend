const BackgroundSection = () => {
  return (
    <div className="absolute left-0 top-[-67px] -z-10 h-screen w-full overflow-hidden web:top-[-139px]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundSection;
