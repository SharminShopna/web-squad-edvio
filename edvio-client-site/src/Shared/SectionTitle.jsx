import "../../src/index.css";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-6/12 my-12">
      <p className="text-TealGreen dark:text-TealGreen text-lg font-semibold italic mb-2">
        --- {subHeading} ---
      </p>
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase border-b-4 border-TealGreen dark:border-TealGreen py-3 shadow-md inline-block">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
