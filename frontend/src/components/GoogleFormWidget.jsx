import React from "react";

const GoogleFormWidget = () => {
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfesyot6lFtU1Wy9sL-pFKsLv77CH7kJ4rDW-2dRfCFee3nZg/viewform?embed=true";
  const handleClick = () => {
    window.open(formUrl, "_blank");
  };

  return (
    <div
      className="bg-card rounded-lg p-2 flex flex-col items-center justify-center dark:bg-[#2a2a2a] dark:text-card-foreground cursor-pointer hover:bg-gray-400 transition-colors duration-300"
      onClick={handleClick}
    >
      <img
        src="/form-preview.svg"
        alt="Google Form Preview"
        className="rounded-lg shadow-lg mb-4"
        width={100}
        height={50}
      />
      <h2 className="text-2xl font-bold mb-2">Feedback Form</h2>
      <p className="text-lg text-center text-muted-foreground">
        Click to open the feedback form
      </p>
    </div>
  );
};

export default GoogleFormWidget;
