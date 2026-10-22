// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorBlock / SetToTileStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetToTileStack(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue, a_iStack: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_rBelow = callMethod("GetOwner", t_rObj);
  callMethod("RemChild", t_rBelow, callMethod("GetKey", t_rObj))
  for (var i = 1; i <= callMethod("GetCount", t_rObj); ++i) {
  var t_rAbove = t_rObj[1];
  callMethod("SetChild", t_rBelow, callMethod("GetKey", t_rAbove), t_rAbove)
  callMethod("SetOwner", t_rAbove, t_rBelow)
  }

  var t_rActual = a_rTile;
  for (var i = 1; i <= a_iStack; ++i) {
  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  t_rActual = t_rActual[1];
  continue;
  }

  callNamed("error", _this, "Stack height is not correct, adapting!", symbol("SetToTileStack"))
  break;
  }

  if (lingoBinary("gt", callMethod("GetCount", t_rActual), 0)) {
  var t_rUnknown = t_rActual[1];
  callMethod("SetOwner", t_rUnknown, t_rObj)
  callMethod("RemChild", t_rActual, callMethod("GetKey", t_rUnknown))
  callMethod("SetChild", t_rObj, callMethod("GetKey", t_rUnknown), t_rUnknown)
  }

  callMethod("SetOwner", t_rObj, t_rActual)
  callMethod("SetChild", t_rActual, callMethod("GetKey", t_rObj), t_rObj)
  callMethod("SetRelPos", t_rObj, callNamed("vector", 0, 0, callNamed("integer", callMethod("GetParam", t_rActual, "HGT"))))
  callMethod("SetSprites", callMethod("GetVisual", t_rObj))
  return 1;
}

