// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniSetLoader / load

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function load(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue, a_rClient: LingoValue, a_kMethod: LingoValue) {
  setMeProp(_me, "m_mp_iType_rImage", a_mp_iType_rOutput);
  setMeProp(_me, "m_rCallback", a_rCallback);
  setMeProp(_me, "m_rClient", a_rClient);
  setMeProp(_me, "m_kMethod", a_kMethod);
  var t_iCount = a_mp_iType_rOutput.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iType = callMethod("getPropAt", a_mp_iType_rOutput, i);
  if (lingoBinary("gt", t_iType, 10000)) {
  t_iType = lingoBinary("sub", t_iType, 10000);
  }

  /*
   * ⚠ HAND-CORRECTED: track EVERY requested item, not just ones whose CAST is
   * unattached. The old test `not IsItemReady` skipped items whose cast was
   * already attached but whose bitmap PNGs had not decoded yet — those fell
   * straight through to the callback and rendered blank/black (the "posters
   * sometimes show nothing until you click away and back"). `update` now waits on
   * real render-readiness (art residency) for each tracked item and `LoadCastLibsForType`
   * is a no-op for a cast already #ready, so adding all requested items is safe.
   * See update() + [[member-duplicate-not-implemented]].
   */
  if (lingoBinary("lt", callMethod("getPos", meProp(_me, "m_ar_iToBeLoaded"), t_iType), 1)) {
  callMethod("add", meProp(_me, "m_ar_iToBeLoaded"), t_iType)
  }

  }

  if (meProp(_me, "m_ar_iToBeLoaded").count) {
  for (var t_iType of meProp(_me, "m_ar_iToBeLoaded").toArray()) {
  callMethod("LoadCastLibsForType", meProp(_me, "m_rFurniLoader"), t_iType)
  }

  callNamed("receiveUpdate", callMethod("getID", _this))
  } else {
  callMethod("update", _this)
  }

}

