import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Comparison: React.VFC<{
  currentRank: string;
  preRank: string;
}> = ({ currentRank, preRank }) => {
  if (currentRank !== "圏外" && preRank !== "圏外") {
    let sub = Number(preRank) - Number(currentRank);
    let abs = Math.abs(sub);

    if (sub > 0) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {abs}
          <ArrowUpwardIcon color="error" />
        </div>
      );
    } else if (sub < 0) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {abs}
          <ArrowDownwardIcon color="primary" />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          不変
          <ArrowForwardIcon color="disabled" />
        </div>
      );
    }
  } else if (currentRank !== "圏外" && preRank === "圏外") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        ---
        <ArrowDownwardIcon color="primary" />
      </div>
    );
  } else if (currentRank === "圏外" && preRank !== "圏外") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        ---
        <ArrowUpwardIcon color="error" />
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        ---
        <ArrowForwardIcon color="disabled" />
      </div>
    );
  }
};
