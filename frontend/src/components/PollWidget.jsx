import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const PollWidget = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false); // Track if a vote has been cast

  useEffect(() => {
    // Initialize votes with 0 for each option if needed
    const initialVotes = {};
    options.forEach((option) => (initialVotes[option] = 0));
    setVotes(initialVotes);
  }, [options]);

  const handleOptionSelect = (option) => {
    if (hasVoted) return; // Prevent selecting if already voted

    setSelectedOption(option);
  };

  const handleVote = () => {
    if (!selectedOption) return;

    setVotes((prevVotes) => ({
      ...prevVotes,
      [selectedOption]: prevVotes[selectedOption] + 1,
    }));
    setHasVoted(true); // Mark that a vote has been cast
  };

  const totalVotes = Object.values(votes).reduce((acc, vote) => acc + vote, 0);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-14 col-md-12">
          {" "}
          {/* Adjusted column size */}
          <div className="border rounded p-4 shadow bg-light">
            <h1 className="text-center mb-4 font-weight-bold text-primary">
              <span style={{ fontWeight: "bold" }}>Poll</span>
            </h1>
            <h2 className="text-center mb-4 text-secondary">{question}</h2>
            <div className="list-group">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedOption === option
                      ? "bg-primary text-white"
                      : "bg-light"
                  } ${hasVoted ? "cursor-default" : "cursor-pointer"}`}
                  onClick={() => !hasVoted && handleOptionSelect(option)}
                >
                  <span>{option}</span>
                  {hasVoted && (
                    <span className="d-flex align-items-center gap-2">
                      <span className="text-sm">
                        {totalVotes > 0
                          ? ((votes[option] / totalVotes) * 100).toFixed(0) +
                            "%"
                          : "0%"}
                      </span>
                      {selectedOption === option && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {!hasVoted && (
              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className={`w-100 mt-3 btn ${
                  selectedOption ? "btn-primary" : "btn-secondary"
                }`}
              >
                {selectedOption ? "Vote" : "Select an option"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollWidget;
