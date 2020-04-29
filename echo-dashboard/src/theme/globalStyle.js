import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.blue}
  }

  /* MapBox GL Style Overrides */
  .mapboxgl-canvas-container {
    opacity: 0.6;
  }

  /* Popup */
  .mapboxgl-popup {
    border-radius: ${({ theme }) => theme.radius.medium};
    width: 250px;
    height: 150px;
    background: linear-gradient( 180deg, #23354f94 0%, #1b2a40ab 100% );
    backdrop-filter: blur(10px);
    animation: transitionIn .8s ease forwards;
  }

  @keyframes transitionIn {
    0% {
    opacity: 0;
    height: 0px;
  }

  100% {
    opacity: 1;
    height: 150px;
  }
  }

  .mapboxgl-popup-content {
    background: none;
    box-shadow: none;
  }

  .mapboxgl-popup-close-button {
    display: none;
  }
`;

export default GlobalStyle;
