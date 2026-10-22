// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sWindowID", "Moderator_AKB");
  setMeProp(_me, "m_rWnd", undefined);
  setMeProp(_me, "m_arBanTimes", new LingoList([120, 1440, 10080, 43200, 6000000]));
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  setMeProp(_me, "m_sName", "");
  setMeProp(_me, "m_ar_PermList", undefined);
  setMeProp(_me, "m_mp_modReasons", callNamed("value", callNamed("getText", "modreasons")));
  setMeProp(_me, "m_rComponentsPage", undefined);
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  callNamed("receiveUpdate", callMethod("getID", _this))
  }

  }

  return 1;
}

