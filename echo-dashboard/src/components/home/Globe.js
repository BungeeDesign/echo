import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Canvas, useFrame } from 'react-three-fiber';

const StyledGlobe = styled.div`
  width: 100%;
  height: 500px;
`;

const Header = ({}) => {
  const mesh = useRef();

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <StyledGlobe>
      <Canvas>
        <group position={[0, 0.1, 0.1]}>
          <mesh>
            <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} />
            <meshStandardMaterial attach="material" color={0xf95b3c} />
          </mesh>
        </group>
      </Canvas>
    </StyledGlobe>
  );
};

export default Header;
