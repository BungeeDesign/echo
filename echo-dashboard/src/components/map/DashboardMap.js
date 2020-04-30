import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userConext';
import styled from 'styled-components';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin';
import UserPin from './UserPin';
import MapModal from './MapModal';

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
    width: '100%',
    height: '100%',
    latitude: 10.550231,
    longitude: 107.552053,
    zoom: 15,
  });
  const [mapModal, setMapModal] = useState(false);
  const [popupLat, setPopupLat] = useState(0);
  const [popupLong, setPopupLong] = useState(0);
  const [popupUser, setPopupUser] = useState({});

  // User Context
  const userContext = useContext(UserContext);
  const { getUsers, users } = userContext;

  useEffect(() => {
    getUsers();
  }, [getUsers, users]);

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

        {users.map((user) => (
          <Marker
            latitude={user.userDetails.location.lat}
            longitude={user.userDetails.location.long}
            key={user._id}
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
              sos={user.sos.active}
            />
          </Marker>
        ))}
      </ReactMapGL>
    </StyledContainer>
  );
};

export default DashboardMap;
