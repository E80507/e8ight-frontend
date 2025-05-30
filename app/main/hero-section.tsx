import ActionButtons from "@/components/shared/layout/action-buttons";

const HeroSection = () => {
  return (
    <section className="mx-auto mb-[60px] size-full max-w-[1440px] px-4 pt-[426px] tablet:px-[30px] web:mb-[100px] web:px-[120px] web:pt-[100px]">
      <div className="mb-8 flex h-full gap-x-2 text-center text-white web:mb-10">
        <div className="size-2 rounded-full bg-[#70D5B2] web:size-4" />
        <div className="flex flex-col">
          <h1 className="text-left text-black mobile:gibson-h1-s tablet:mb-3 tablet:gibson-h1-m web:mb-1 web:gibson-h1-l">
            Global No.1
            <br />
            Digital Twin Platform
          </h1>
          <h2 className="text-left text-label-natural mobile:gibson-body-3 tablet:gibson-body-2 web:gibson-body-1">
            The Evolution of Digital
            <br className="hidden mobile:block" />
            Transformation
          </h2>
        </div>
      </div>
      <ActionButtons />
    </section>
  );
};

export default HeroSection;
