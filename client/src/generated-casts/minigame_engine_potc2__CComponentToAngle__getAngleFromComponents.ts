// minigame_engine_potc2.cct / CComponentToAngle / getAngleFromComponents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAngleFromComponents(_me: LingoMe, xComponent: LingoValue, yComponent: LingoValue) {
  if (lingoBinary("lte", callNamed("abs", xComponent), callNamed("abs", yComponent))) {
  if (lingoBinary("eq", yComponent, 0)) {
  yComponent = 1;
  }

  xComponent = lingoBinary("mul", xComponent, 256);
  var temp = lingoBinary("div", callNamed("integer", xComponent), callNamed("integer", yComponent));
  if (lingoBinary("lt", temp, 0)) {
  temp = -float(temp);
  }

  if (lingoBinary("gt", temp, 255)) {
  temp = 255;
  }

  if (lingoBinary("lt", yComponent, 0)) {
  if (lingoBinary("gt", xComponent, 0)) {
  return meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)];
  } else {
  return lingoBinary("sub", 360, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  }

  } else {
  if (lingoBinary("gt", xComponent, 0)) {
  return lingoBinary("sub", 180, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  } else {
  return lingoBinary("add", 180, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  }

  }

  } else {
  if (lingoBinary("eq", xComponent, 0)) {
  xComponent = 1;
  }

  yComponent = lingoBinary("mul", yComponent, 256);
  temp = lingoBinary("div", callNamed("integer", yComponent), callNamed("integer", xComponent));
  if (lingoBinary("lt", temp, 0)) {
  temp = -float(temp);
  }

  if (lingoBinary("gt", temp, 255)) {
  temp = 255;
  }

  if (lingoBinary("lt", yComponent, 0)) {
  if (lingoBinary("gt", xComponent, 0)) {
  return lingoBinary("sub", 90, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  } else {
  return lingoBinary("add", 270, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  }

  } else {
  if (lingoBinary("gt", xComponent, 0)) {
  return lingoBinary("add", 90, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  } else {
  return lingoBinary("sub", 270, meProp(_me, "m_componentToAngleArray")[lingoBinary("add", temp, 1)]);
  }

  }

  }

}

