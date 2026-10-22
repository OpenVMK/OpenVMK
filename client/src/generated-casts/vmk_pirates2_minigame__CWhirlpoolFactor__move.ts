// vmk_pirates2_minigame.cct / CWhirlpoolFactor / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  var t_oNextChange = 2;
  var t_oDeviation = 1;
  var tMyObject = callMethod("getObject", _me);
  var tdir = callMethod("GetParam", tMyObject, "Direction");
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tVariables = callMethod("GetParam", tMyObject, "GameParams");
  tVariables[t_oNextChange] = lingoBinary("sub", tVariables[t_oNextChange], 1);
  if (lingoBinary("lte", tVariables[t_oNextChange], 0)) {
  var tNewDeviation = lingoBinary("add", tVariables[t_oDeviation], 1);
  if (lingoBinary("gt", tNewDeviation, 4)) {
  tNewDeviation = 1;
  }

  tVariables[t_oNextChange] = lingoBinary("add", callMethod("getRandomNumber", callMethod("GetQuickRandom", meProp(_me, "m_rMGE")), callMethod("IterateSeed", callMethod("GetQuickRandom", meProp(_me, "m_rMGE")), callMethod("GetTurnNumber", meProp(_me, "m_rMGE"))), 20), 10);
  tVariables[t_oDeviation] = tNewDeviation;
  }

  tdir = lingoBinary("sub", tdir, tVariables[t_oDeviation]);
  if (lingoBinary("lt", tdir, 0)) {
  tdir = lingoBinary("add", tdir, 360);
  }

  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rMGE"));
  setThePropOf(tPos, "x", lingoBinary("add", tPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", tVelTable, tdir), meProp(_me, "m_speed")), 256)));
  setThePropOf(tPos, "y", lingoBinary("add", tPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", tVelTable, tdir), meProp(_me, "m_speed")), 256)));
  callMethod("SetParam", tMyObject, "Direction", tdir)
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  callMethod("SetParam", tMyObject, "GameParams", tVariables)
}

