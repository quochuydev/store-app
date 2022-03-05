import React from "react";
import dynamic from "next/dynamic";

// TODO write loading component
// import { Loading } from "@components";

export const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <div />,
  });
};
