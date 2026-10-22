// vmk_pirates_game.cct / CPiratesVisualizerShip / ProcessPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProcessPosition(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  if (callNamed("voidp", meProp(_me, "m_vLocalPosition"))) {
  setMeProp(_me, "m_vLocalPosition", callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"));
  setMeProp(_me, "m_lastVelocity", callMethod("GetParam", callMethod("getObject", _me), "Velocity"));
  } else {
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tDiff = callMethod("substract", tPos, meProp(_me, "m_vLocalPosition"));
  var tNeedChange = callMethod("substract", tDiff, meProp(_me, "m_lastVelocity"));
  if (lingoBinary("gt", callMethod("length", tNeedChange), meProp(_me, "m_maxAcceleration"))) {
  callMethod("normalize", tNeedChange)
  var tVelocity = callMethod("add", meProp(_me, "m_lastVelocity"), callMethod("multiply", tNeedChange, meProp(_me, "m_maxAcceleration")));
  } else {
  tVelocity = tDiff;
  }

  tVelocity = callMethod("divide", callMethod("multiply", tVelocity, 90), 100);
  setMeProp(_me, "m_lastVelocity", tVelocity);
  setMeProp(_me, "m_vLocalPosition", callMethod("add", meProp(_me, "m_vLocalPosition"), tVelocity));
  }

}

