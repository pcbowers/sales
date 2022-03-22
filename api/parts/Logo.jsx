import React from "react"

const myLogo = () => (
  <div
    style={{
      display: "flex",
      gap: "0.5em",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <svg
      style={{ width: "2em", height: "2em" }}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
      <path
        fillRule="evenodd"
        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <h3 style={{ margin: 0 }}>SALES</h3>
  </div>
)

export default myLogo
