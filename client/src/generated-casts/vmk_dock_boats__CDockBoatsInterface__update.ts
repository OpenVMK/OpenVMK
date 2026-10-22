// vmk_dock_boats.cct / CDockBoatsInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTime = theProperty("milliSeconds");
  var tDt = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_lastTime")), float(1000));
  setMeProp(_me, "m_lastTime", tTime);
  var t_rSpline = callMethod("GetSpline", callMethod("getComponent", _me));
  var t_ar_rNewBoats = new LingoList([]);
  for (var tBoat of meProp(_me, "m_ar_rBoats").toArray()) {
  var tRailpos = callMethod("GetParam", tBoat, "RailPosition");
  if (lingoBinary("lt", tRailpos, lingoBinary("sub", callMethod("getNumControlPoints", t_rSpline), 3))) {
  callMethod("SetAbsPos", tBoat, callMethod("InterpolateAt", t_rSpline, tRailpos))
  callMethod("SetParam", tBoat, "RailPosition", lingoBinary("add", tRailpos, lingoBinary("mul", tDt, meProp(_me, "m_knotspersec"))))
  callMethod("append", t_ar_rNewBoats, tBoat)
  continue;
  }

  callMethod("RemoveRoomObject", _me, "boat", callMethod("GetParam", tBoat, "Reference"))
  }

  setMeProp(_me, "m_ar_rBoats", t_ar_rNewBoats);
}

