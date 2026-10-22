// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / SetList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetList(_me: LingoMe, a_mp_spaceList: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("createTopics", meProp(_me, "m_pItemlist"), a_mp_spaceList)
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_rImg = callMethod("getImage", meProp(_me, "m_pItemlist"));
  var t_rBuffer = callMethod("getElement", tWndObj, "nav.roomlist");
  var t_ielemHeight = callMethod("getProperty", t_rBuffer, symbol("height"));
  if (lingoBinary("lt", t_rImg.height, t_ielemHeight)) {
  var t_rTmp = callNamed("image", t_rImg.width, t_ielemHeight, t_rImg.depth);
  callMethod("fill", t_rTmp, t_rTmp.rect, callNamed("rgb", "#001F55"))
  callMethod("copyPixels", t_rTmp, t_rImg, t_rImg.rect, t_rImg.rect)
  callMethod("feedImage", t_rBuffer, t_rTmp)
  } else {
  callMethod("feedImage", t_rBuffer, t_rImg)
  }

  }

}

