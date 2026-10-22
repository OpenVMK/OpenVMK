// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / SetAdvancedModeWindowData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAdvancedModeWindowData(_me: LingoMe, a_sTitle: LingoValue, a_iRoomID: LingoValue, a_mp_roomInstances: LingoValue) {
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle")), "nav.advanced.roomhd"), a_sTitle)
  if (lingoBinary("neq", a_iRoomID, -float(1))) {
  setMeProp(_me, "m_activeRoomID", a_iRoomID);
  }

  if (lingoBinary("and", callNamed("listp", a_mp_roomInstances), lingoBinary("gt", a_mp_roomInstances.count, 1))) {
  var t_mp_advancedModeInstanceInfo = new LingoList([]);
  var t_OneEmptyAdded = 0;
  for (var i = 1; i <= a_mp_roomInstances.count; ++i) {
  if (lingoBinary("gt", a_mp_roomInstances[i].instanuserpercent, 0)) {
  callMethod("add", t_mp_advancedModeInstanceInfo, a_mp_roomInstances[i])
  continue;
  }

  if ((lingoTruthy(t_OneEmptyAdded) ? 0 : 1)) {
  callMethod("add", t_mp_advancedModeInstanceInfo, a_mp_roomInstances[i])
  t_OneEmptyAdded = 1;
  }

  }

  setMeProp(_me, "m_mp_advancedModeInstanceInfo", t_mp_advancedModeInstanceInfo);
  } else {
  setMeProp(_me, "m_mp_advancedModeInstanceInfo", a_mp_roomInstances);
  }

  callMethod("RefreshAdvancedInterface", _me)
}

