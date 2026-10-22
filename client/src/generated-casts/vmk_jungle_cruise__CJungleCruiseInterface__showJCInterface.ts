// vmk_jungle_cruise.cct / CJungleCruiseInterface / showJCInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showJCInterface(_me: LingoMe) {
  callNamed("executeMessage", symbol("ui_hide"))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("eq", tWndObj, 0)) {
  if (lingoBinary("neq", callNamed("ilk", meProp(_me, "m_scoreSprite"), symbol("sprite")), 1)) {
  setMeProp(_me, "m_scoreSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  }

  setThePropOf(meProp(_me, "m_scoreSprite"), "member", callNamed("getMember", "ScoreFloat"));
  setThePropOf(meProp(_me, "m_scoreSprite"), "width", meProp(_me, "m_scoreSprite").member.width);
  setThePropOf(meProp(_me, "m_scoreSprite"), "height", meProp(_me, "m_scoreSprite").member.height);
  setThePropOf(meProp(_me, "m_scoreSprite"), "loc", callNamed("point", -float(100), -float(100)));
  setThePropOf(meProp(_me, "m_scoreSprite"), "locZ", 3);
  setMeProp(_me, "m_exitButton", new LingoPropList([]));
  meProp(_me, "m_exitButton")[symbol("sprite")] = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  meProp(_me, "m_exitButton")[symbol("Active")] = callNamed("getMember", "button.exitpirates.active");
  meProp(_me, "m_exitButton")[symbol("pressed")] = callNamed("getMember", "button.exitpirates.pressed");
  setThePropOf(meProp(_me, "m_exitButton").sprite, "member", meProp(_me, "m_exitButton").Active);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "width", meProp(_me, "m_exitButton").sprite.member.width);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "height", meProp(_me, "m_exitButton").sprite.member.height);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "locZ", 4);
  setThePropOf(meProp(_me, "m_exitButton").sprite, "loc", callNamed("point", 726, 570));
  setThePropOf(meProp(_me, "m_exitButton").sprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  setMeProp(_me, "m_ar_hideables", new LingoList([meProp(_me, "m_scoreSprite").spriteNum, meProp(_me, "m_exitButton").sprite.spriteNum]));
  for (var tHideable of callMethod("GetHideables", meProp(_me, "m_camera")).toArray()) {
  callMethod("append", meProp(_me, "m_ar_hideables"), tHideable)
  }

  if (callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_jc_interface.window", 0, 0)) {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("fixAntialising", _me, "gas.amount")
  callMethod("fixAntialising", _me, "film.amount")
  callMethod("fixAntialising", _me, "jc.score")
  callMethod("fixAntialising", _me, "jc.pts", 1)
  callMethod("updateScrollingFilm", _me, callMethod("getComponent", _me).m_filmstrip)
  callMethod("updatePowerups", _me)
  callMethod("updateScoreinfo", _me)
  return 1;
  } else {
  return 0;
  }

  } else {
  return 1;
  }

}

