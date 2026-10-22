// vmk_fireworks.cct / CFireworksGameInterface / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  callNamed("put", "CFireworksGameInterface::UnprepareRoom - begin")
  callNamed("removeUpdate", callMethod("getID", _me))
  var t_rMod = callNamed("getWindow", "mod_wnd");
  if (callNamed("objectp", t_rMod)) {
  callMethod("show", t_rMod)
  }

  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_fireWorkSelector")))
  if (callNamed("objectp", meProp(_me, "m_rStageInfoWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rStageInfoWindow")))
  }

  for (var tSpr of meProp(_me, "m_ar_fwSpritelist").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSpr)) ? 0 : 1)) {
  callNamed("releaseSprite", tSpr.spriteNum)
  }

  }

  for (var tComm of meProp(_me, "m_ar_comments").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tComm)) ? 0 : 1)) {
  callNamed("releaseSprite", tComm.sprite.spriteNum)
  }

  }

  for (var tFlash of meProp(_me, "m_ar_mp_flashList").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tFlash)) ? 0 : 1)) {
  callNamed("releaseSprite", tFlash.sprite.spriteNum)
  }

  }

  for (var tSpr of meProp(_me, "m_rDisplayComboStatusSprites").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSpr)) ? 0 : 1)) {
  callNamed("releaseSprite", tSpr.spriteNum)
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rDisplayComboAwardSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rDisplayComboAwardSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelectorSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rSelectorSprite").spriteNum)
  }

  setTheProperty("mouseDownScript", meProp(_me, "m_oldMousedownScript"));
  callNamed("removeWriter", "fireworks_score")
  callNamed("removeWriter", meProp(_me, "m_sDisplayComboAwardWriter"))
  callNamed("removeMember", lingoBinary("join", meProp(_me, "m_sDisplayComboAwardWriter"), ".image"))
  callMethod("FreeSelector", _me)
  for (var tSpr of meProp(_me, "m_ar_sprGraphicCursor").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSpr)) ? 0 : 1)) {
  callNamed("releaseSprite", tSpr.spriteNum)
  }

  }

  setMeProp(_me, "m_ar_sprGraphicCursor", new LingoList([]));
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("executeMessage", "PlayRoomSound")
  callMethod("cursor", _player, -float(1))
  if (callNamed("timeoutExists", "ExplodeAllTimeout")) {
  callNamed("removeTimeout", "ExplodeAllTimeout")
  }

  setMeProp(_me, "m_prepared", 0);
  callNamed("put", "CFireworksGameInterface::UnprepareRoom - end")
}

