import ActionButtons from "@/components/shared/layout/action-buttons";

const HeroSection = () => {
  return (
    <section className="relative mx-auto h-screen w-full max-w-[1440px] px-4 tablet:px-[30px] web:h-[calc(100vh-139px)] web:px-[120px] web:pt-[100px]">
      <div className="absolute bottom-0 mb-[100px] flex flex-col gap-x-2 text-center text-white ">
        <div className="mb-8 flex flex-col gap-y-3">
          <h1 className="text-left !leading-[140%] text-white gibson-h1-s tablet:gibson-h1-m web:gibson-h1-l">
            Global No.1
            <br />
            Digital Twin Platform
          </h1>
          <h2 className="text-left text-background-alternative gibson-body-3 tablet:gibson-body-2 web:gibson-body-1">
            The Evolution of Digital
            <br className="block tablet:hidden" />
            Transformation
          </h2>
        </div>
        <ActionButtons className="border-black-1 bg-white text-black hover:border-primary hover:bg-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
