import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const Loading = ({isLoading}) => {
  return (
    <div className="white f5 mt2">
      {isLoading ? <LinearProgress variant="query" color="secondary" /> : null}
    </div>
  );
};
export default Loading;
