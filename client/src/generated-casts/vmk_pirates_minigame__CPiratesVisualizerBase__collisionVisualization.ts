// vmk_pirates_minigame.cct / CPiratesVisualizerBase / collisionVisualization

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionVisualization(_me: LingoMe) {
  if (meProp(_me, "m_mp_csVis").on) {
  var t_rGameEngine = callMethod("getComponent", callNamed("getThread", "minigame"));
  var t_rVelTable = callMethod("GetVelocityTable", t_rGameEngine);
  switch (callMethod("GetParam", callMethod("getObject", _me), "BoundsType")) {
case symbol("point"):
  break;
case symbol("circle"):
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprite, "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprite, "locZ", -float(30));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprite, "blend", 50);
  break;
case symbol("triplecircle"):
  tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tdir = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  var tCircle1X = lingoBinary("add", tPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tdir), callMethod("GetParam", callMethod("getObject", _me), "1stOffset")), 256));
  var tCircle1Y = lingoBinary("add", tPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tdir), callMethod("GetParam", callMethod("getObject", _me), "1stOffset")), 256));
  var tCircle3X = lingoBinary("add", tPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tdir), callMethod("GetParam", callMethod("getObject", _me), "3rdOffset")), 256));
  var tCircle3Y = lingoBinary("add", tPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tdir), callMethod("GetParam", callMethod("getObject", _me), "3rdOffset")), 256));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[1], "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tCircle1X, tCircle1Y)));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[2], "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[3], "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tCircle3X, tCircle3Y)));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[1], "locZ", -float(30));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[2], "locZ", -float(30));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[3], "locZ", -float(30));
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[1], "blend", 50);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[2], "blend", 50);
  setThePropOf(meProp(_me, "m_mp_csVis").vis.sprites[3], "blend", 50);
  break;
case symbol("box"):
  break;
  }

  }

}

