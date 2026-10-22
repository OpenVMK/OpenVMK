// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / ManageModWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ManageModWindows(_me: LingoMe, _this: LingoValue, a_sWndName: LingoValue, a_mp_Data: LingoValue) {
  switch (a_sWndName) {
case "mod_message":
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_objModMessage")), callNamed("listp", a_mp_Data))) {
  callMethod("CreateModeratorMessage", meProp(_me, "m_objModMessage"), a_mp_Data)
  }

  break;
case "akb":
  if (callNamed("objectp", meProp(_me, "m_objModAKB"))) {
  callMethod("OpenCloseAkbWindow", meProp(_me, "m_objModAKB"))
  }

  break;
case "mod_menu":
  if (callNamed("objectp", meProp(_me, "m_objModMenu"))) {
  callMethod("OpenCloseMenuWindow", meProp(_me, "m_objModMenu"))
  }

  break;
  }

}

