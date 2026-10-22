// vmk_fireworks.cct / CFireworksGameInterface / toggleStageInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toggleStageInfo(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rStageInfoWindow"))) ? 0 : 1)) {
  var t = callNamed("createWindow", "fw_stage_info_window");
  setMeProp(_me, "m_rStageInfoWindow", callNamed("getWindow", "fw_stage_info_window"));
  callMethod("merge", meProp(_me, "m_rStageInfoWindow"), "vmk_fw_nextstage.window")
  callMethod("center", meProp(_me, "m_rStageInfoWindow"))
  var t_bShowWindow = 1;
  setMeProp(_me, "m_prepared", 1);
  } else {
  t_bShowWindow = (lingoTruthy(callMethod("getProperty", meProp(_me, "m_rStageInfoWindow"), symbol("visible"))) ? 0 : 1);
  }

  if (t_bShowWindow) {
  var t_stage = callMethod("GetStage", callMethod("getComponent", _me));
  var t_ar_combination = callMethod("GetBonusCombination", t_stage);
  var t_ar_Images = new LingoList([]);
  var t_iWidth = 0;
  var t_iHeight = 0;
  for (var t_sBonus of t_ar_combination.toArray()) {
  var t_rImg = callMethod("duplicate", callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", t_sBonus), ".next")).image);
  t_iWidth = lingoBinary("add", t_iWidth, t_rImg.width);
  t_iHeight = lingoBinary("add", t_iHeight, t_rImg.height);
  callMethod("append", t_ar_Images, t_rImg)
  }

  var t_rContainer = callNamed("image", t_iWidth, t_iHeight, 32);
  var t_rOffset = callNamed("rect", 0, 0, 0, 0);
  for (var t_rImg of t_ar_Images.toArray()) {
  callMethod("copyPixels", t_rContainer, t_rImg, lingoBinary("add", t_rImg.rect, t_rOffset), t_rImg.rect)
  t_rOffset = lingoBinary("add", t_rOffset, callNamed("rect", t_rImg.width, 0, t_rImg.width, 0));
  }

  var tElement = callMethod("getElement", meProp(_me, "m_rStageInfoWindow"), "fw.combo");
  if (callNamed("objectp", tElement)) {
  callMethod("feedImage", tElement, t_rContainer)
  var tSprite = callMethod("getProperty", tElement, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite.member, "image", t_rContainer);
  setThePropOf(tSprite, "width", tSprite.member.width);
  setThePropOf(tSprite, "height", tSprite.member.height);
  setThePropOf(tSprite.member, "regPoint", lingoBinary("sub", callNamed("point", lingoBinary("div", tSprite.member.width, 2), 0), callNamed("point", lingoBinary("div", 255, 2), 0)));
  }

  }

  callMethod("show", meProp(_me, "m_rStageInfoWindow"))
  callMethod("initComboStatus", _me)
  callMethod("activateExplodeAll", _me, 1)
  } else {
  callMethod("hide", meProp(_me, "m_rStageInfoWindow"))
  callMethod("activateExplodeAll", _me)
  }

}

