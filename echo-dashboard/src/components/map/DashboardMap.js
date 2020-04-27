import React, { useState } from "react";
import styled from "styled-components";
import ReactMapGL from "react-map-gl";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  grid-column-start: 1;
  grid-column-end: -1;
  overflow: hidden;
`;

const DashboardMap = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: -4.032226,
    longitude: 39.7099894,
    zoom: 15,
  });

  return (
    <StyledContainer>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYnVuZ2VlZGVzaWduIiwiYSI6ImNrOWowajc2dDBhejgzaG56Y3ZrbGU5angifQ.QNM9hTQfBRZonOpsaUVc_w"
        onViewportChange={setViewport}
        onLoad={() => console.log("Loaded...")}
      />
    </StyledContainer>
  );
};

export default DashboardMap;
