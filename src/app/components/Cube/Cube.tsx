import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

export const Cube = () => {
  const [isToto, setIsToto] = useState(false);
  return <canvas ref={canvasRef} id="ascii-cube" />;
};
