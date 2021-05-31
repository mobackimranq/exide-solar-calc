import React from "react";

export default function CenteredContainer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}
