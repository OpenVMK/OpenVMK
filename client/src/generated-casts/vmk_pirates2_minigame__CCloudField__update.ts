// vmk_pirates2_minigame.cct / CCloudField / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tWindIndicator = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEng"), 8);
  if (lingoBinary("neq", tWindIndicator.count, 1)) {
  return;
  }

  var tStrength = callMethod("GetParam", tWindIndicator[1], "Strength");
  var tdir = callMethod("GetParam", tWindIndicator[1], "Direction");
  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rGameEng"));
  for (var tCloud of meProp(_me, "m_ar_clouds").toArray()) {
  var tPos = callMethod("GetParam", tCloud, "WorldPosition");
  setThePropOf(tPos, "x", lingoBinary("add", lingoBinary("add", tPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", tVelTable, tdir), tStrength), 64)), callNamed("random", 10)));
  setThePropOf(tPos, "y", lingoBinary("add", lingoBinary("add", tPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", tVelTable, tdir), tStrength), 64)), callNamed("random", 10)));
  if (lingoBinary("gt", tPos.x, 60000)) {
  setThePropOf(tPos, "x", lingoBinary("sub", tPos.x, 120000));
  }

  if (lingoBinary("lt", tPos.x, -float(60000))) {
  setThePropOf(tPos, "x", lingoBinary("add", tPos.x, 120000));
  }

  if (lingoBinary("gt", tPos.y, 60000)) {
  setThePropOf(tPos, "y", lingoBinary("sub", tPos.y, 120000));
  }

  if (lingoBinary("lt", tPos.y, -float(60000))) {
  setThePropOf(tPos, "y", lingoBinary("add", tPos.y, 120000));
  }

  callMethod("SetParam", tCloud, "WorldPosition", tPos)
  }

}

