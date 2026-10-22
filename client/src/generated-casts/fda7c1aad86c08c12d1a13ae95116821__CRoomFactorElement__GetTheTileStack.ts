// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / GetTheTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTheTileStack(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_rTile");
  var t_rUnknown = callMethod("GetOwner", callMethod("getObject", _this));
  while (1) {
  if (callNamed("objectp", t_rUnknown)) {
  var t_sCls = callMethod("GetParam", t_rUnknown, "CLASS");
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", t_sCls, "tile"), lingoBinary("eq", t_sCls, "exit")), lingoBinary("eq", t_sCls, "teleport")), lingoBinary("eq", t_sCls, "queue")), lingoBinary("eq", t_sCls, "sit"))) {
  return t_rUnknown;
  } else {
  t_rUnknown = callMethod("GetOwner", t_rUnknown);
  }

  continue;
  }

  return undefined;
  }

}

