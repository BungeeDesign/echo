import React, { useState } from "react";
import styled from "styled-components";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import Pin from "./Pin";
import UserPin from "./UserPin";
import MapModal from "./MapModal";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  grid-column-start: 1;
  grid-column-end: -1;
  overflow: hidden;
`;

const DashboardMap = () => {
  // Compoenent State
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10.550231,
    longitude: 107.552053,
    zoom: 15,
  });
  const [mapModal, setMapModal] = useState(false);
  const [popupLat, setPopupLat] = useState(0);
  const [popupLong, setPopupLong] = useState(0);
  const [popupUser, setPopupUser] = useState({});

  // Temp Mocked JSON API Data
  const tempUsers = [
    {
      userDetails: {
        name: "Ananada",
        location: {
          lat: 10.557,
          long: 107.54,
        },
        age: 34,
        gender: "Female",
        pregnant: false,
        adultsWith: 1,
        minorsWith: 0,
      },
      stats: {
        food: "Medium",
        health: {
          complications: ["Fractured Leg", "Heart Condition"],
        },
        shelter: true,
        trapped: false,
      },
      sos: {
        active: true,
        message: "Having trouble breathing",
      },
    },
    {
      userDetails: {
        name: "Charong",
        location: {
          lat: 10.554,
          long: 107.545,
        },
        age: 34,
        gender: "Male",
        pregnant: false,
        adultsWith: 1,
        minorsWith: 0,
      },
      stats: {
        food: "Medium",
        health: {
          complications: ["Fractured Leg", "Heart Condition"],
        },
        shelter: true,
        trapped: false,
      },
      sos: {
        active: true,
        message: "Having trouble breathing",
      },
    },
    {
      userDetails: {
        name: "Isra",
        location: {
          lat: 10.551,
          long: 107.54,
        },
        age: 34,
        gender: "Female",
        pregnant: false,
        adultsWith: 1,
        minorsWith: 0,
      },
      stats: {
        food: "High",
        health: {
          complications: ["Fractured Leg", "Heart Condition"],
        },
        shelter: true,
        trapped: false,
      },
      sos: {
        active: true,
        message: "Having trouble breathing",
      },
    },
    {
      userDetails: {
        name: "Kiet",
        location: {
          lat: 10.557,
          long: 107.552053,
        },
        age: 34,
        gender: "Male",
        pregnant: false,
        adultsWith: 1,
        minorsWith: 0,
      },
      stats: {
        food: "Low",
        health: {
          complications: ["Fractured Leg", "Heart Condition"],
        },
        shelter: true,
        trapped: false,
      },
      sos: {
        active: true,
        message: "Having trouble breathing",
      },
    },
  ];

  const renderModal = () => {
    return (
      mapModal && (
        <Popup
          tipSize={0}
          anchor="top-left"
          longitude={popupLong}
          latitude={popupLat}
          closeOnClick={true}
        >
          <MapModal user={popupUser} />
        </Popup>
      )
    );
  };

  return (
    <StyledContainer>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYnVuZ2VlZGVzaWduIiwiYSI6ImNrOWowajc2dDBhejgzaG56Y3ZrbGU5angifQ.QNM9hTQfBRZonOpsaUVc_w"
        onViewportChange={setViewport}
      >
        {renderModal()}
        <Marker latitude={10.554} longitude={107.552053}>
          <Pin onClick={() => setMapModal((mapModal) => !mapModal)} />
        </Marker>

        {tempUsers.map((user) => (
          <Marker
            latitude={user.userDetails.location.lat}
            longitude={user.userDetails.location.long}
          >
            <UserPin
              onClick={() => {
                setMapModal((mapModal) => !mapModal);
                setPopupLat((popupLat) => user.userDetails.location.lat);
                setPopupLong((popupLong) => user.userDetails.location.long);
                setPopupUser({
                  ...popupUser,
                  details: {
                    name: user.userDetails.name,
                    age: user.userDetails.age,
                    status: user.stats,
                  },
                });
              }}
            />
          </Marker>
        ))}
      </ReactMapGL>
    </StyledContainer>
  );
};

export default DashboardMap;
