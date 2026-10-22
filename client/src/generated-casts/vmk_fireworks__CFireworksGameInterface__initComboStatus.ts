// vmk_fireworks.cct / CFireworksGameInterface / initComboStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initComboStatus(_me: LingoMe) {
  var t_stage = callMethod("GetStage", callMethod("getComponent", _me));
  var t_ar_combination = callMethod("GetBonusCombination", t_stage);
  for (var t_rSpr of meProp(_me, "m_rDisplayComboStatusSprites").toArray()) {
  setThePropOf(t_rSpr, "visible", 0);
  }

  var t_iOffsetX = 0;
  for (var i = 1; i <= t_ar_combination.count; ++i) {
  var t_sBonus = t_ar_combination[i];
  var t_rMem = callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", t_sBonus), ".aim"));
  var t_rSprite = meProp(_me, "m_rDisplayComboStatusSprites")[i];
  setThePropOf(t_rSprite, "member", t_rMem);
  setThePropOf(t_rSprite, "width", t_rMem.width);
  setThePropOf(t_rSprite, "height", t_rMem.height);
  setThePropOf(t_rSprite, "visible", 1);
  setThePropOf(t_rSprite, "loc", lingoBinary("add", callNamed("point", t_iOffsetX, 0), t_rMem.regPoint));
  setThePropOf(t_rSprite, "locZ", 1000);
  setThePropOf(t_rSprite, "blend", 50);
  t_iOffsetX = lingoBinary("add", t_iOffsetX, t_rMem.width);
  }

  var tWriter = callNamed("getWriter", meProp(_me, "m_sDisplayComboAwardWriter"));
  var t_sLevelText = callNamed("string", callMethod("GetComboReward", t_stage));
  var tImage = callMethod("render", tWriter, t_sLevelText);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite").member, "image", tImage);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite").member, "regPoint", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "width", tImage.width);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "height", tImage.height);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "loc", callNamed("point", t_iOffsetX, 0));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "blend", 50);
}

