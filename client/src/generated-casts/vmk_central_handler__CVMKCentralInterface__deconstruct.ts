// vmk_central_handler.cct / CVMKCentralInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sHiddenMickeyWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sHiddenMickeyWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sQuestWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sQuestWindowTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sHerbieWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sHerbieWindowTitle"))
  }

  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initNPC"))
  for (var tSprite of meProp(_me, "m_roomEventSprites").toArray()) {
  callNamed("removeEventBroker", tSprite.spriteNum)
  }

  var tObject = callNamed("getObject", "VMKCenterMickeyDetailsList");
  if (lingoBinary("neq", tObject, 0)) {
  callNamed("removeObject", callMethod("getID", tObject))
  }

  return 1;
}

