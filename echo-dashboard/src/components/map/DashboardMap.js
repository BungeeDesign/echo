import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userConext';
import styled from 'styled-components';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin';
import UserPin from './UserPin';
import MapModal from './MapModal';
import InsightIcon from '../insights/InsightIcon';

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
  const { getUsers, users, setScrollPosition } = userContext;

  // ToDo - Implement a real-time API / Socket Connection
  /**
   * Very simple to do - On the sos update route/endpoint as soon as a request is made emit from the socket and listen here within
   * use effect to request the updated data.
   */
  useEffect(() => {
    getUsers();
    // setInterval(() => {
    //   getUsers();
    // }, 5000);
  }, []);

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

  const caclulateScroll = (i) => {
    setScrollPosition(150 * i);
  };

  return (
    <StyledContainer>
      <InsightIcon />
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYnVuZ2VlZGVzaWduIiwiYSI6ImNrOWowajc2dDBhejgzaG56Y3ZrbGU5angifQ.QNM9hTQfBRZonOpsaUVc_w"
        onViewportChange={setViewport}
      >
        {renderModal()}
        <Marker latitude={10.556} longitude={107.547}>
          <Pin onClick={() => setMapModal((mapModal) => !mapModal)} />
        </Marker>

        {users.map((user, index) => (
          <Marker
            latitude={user.userDetails.location.lat}
            longitude={user.userDetails.location.long}
            key={user._id}
            index={index}
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
                caclulateScroll(index);
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
