import HeroSection from "@/components/shared/dashboard/hero-section";
import SearchSection from "@/components/shared/dashboard/search-section";

const TechLibrary = () => {
  return (
    <div>
      <HeroSection />
      <div className="p-6 tablet:p-[30px] web:px-[120px] web:py-20">
        <SearchSection />
      </div>
    </div>
  );
};

export default TechLibrary;
