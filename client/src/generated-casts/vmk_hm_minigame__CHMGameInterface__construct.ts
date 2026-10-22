// vmk_hm_minigame.cct / CHMGameInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iLastDirection", undefined);
  setMeProp(_me, "m_rAvatar", undefined);
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_bActionActive", 0);
  setMeProp(_me, "m_iControlMethod", symbol("keyboard"));
  setMeProp(_me, "m_iMovementCounter", 0);
  setMeProp(_me, "m_iMoveState", symbol("stopped"));
  setMeProp(_me, "m_iActionState", 0);
  setMeProp(_me, "m_ar_directions", new LingoList([0, 1, 2, 3, 4, 5, 6, 7]));
  var t_iConfig = callMethod("getMyClientKeyConfiguration", _me);
  switch (t_iConfig) {
case 1:
  setMeProp(_me, "m_ar_directions", new LingoList([0, 1, 2, 3, 4, 5, 6, 7]));
  break;
case 2:
  setMeProp(_me, "m_ar_directions", new LingoList([7, 0, 1, 2, 3, 4, 5, 6, 7]));
  break;
  }

  setMeProp(_me, "m_ar_iKeyTable", new LingoPropList([]));
  meProp(_me, "m_ar_iKeyTable")[symbol("left")] = 123;
  meProp(_me, "m_ar_iKeyTable")[symbol("right")] = 124;
  meProp(_me, "m_ar_iKeyTable")[symbol("up")] = 126;
  meProp(_me, "m_ar_iKeyTable")[symbol("down")] = 125;
  meProp(_me, "m_ar_iKeyTable")[symbol("Action")] = 48;
  setMeProp(_me, "m_sKickWarningDlg", "HMG Kickout Timer");
  setMeProp(_me, "m_ar_roundResults", new LingoList([]));
  setMeProp(_me, "m_ar_Windows", new LingoPropList([]));
  meProp(_me, "m_ar_Windows")["UI"] = undefined;
  meProp(_me, "m_ar_Windows")["GameOver"] = undefined;
  meProp(_me, "m_ar_Windows")["Results"] = undefined;
  meProp(_me, "m_ar_Windows")["Keys"] = undefined;
  meProp(_me, "m_ar_Windows")["Waiting"] = undefined;
  meProp(_me, "m_ar_Windows")["GetReady"] = undefined;
  meProp(_me, "m_ar_Windows")["Notice"] = undefined;
  callMethod("sort", meProp(_me, "m_ar_Windows"))
  if (callNamed("textExists", "hm.furniture")) {
  var t_ar_iListOfItems = callNamed("value", callNamed("getText", "hm.furniture"));
  if (callNamed("listp", t_ar_iListOfItems)) {
  var t_rLoader = callNamed("getObject", "RoomItemAssetManager");
  for (var t_iType of t_ar_iListOfItems.toArray()) {
  callMethod("LoadCastLibsForType", t_rLoader, t_iType)
  }

  }

  }

  return 1;
}

