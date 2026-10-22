// vmk_fireworks_minigame.cct / CFireworksGameInterface / ShowStageEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowStageEnd(_me: LingoMe, a_qual: LingoValue, a_iRoundN: LingoValue, a_mp_top15: LingoValue, a_iRank: LingoValue, a_iScore: LingoValue, a_iLowestQual: LingoValue, a_iTime: LingoValue) {
  callMethod("activateExplodeAll", _me, 1)
  if (callNamed("windowExists", meProp(_me, "m_sEndStageWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sEndStageWndTitle"))
  }

  if (callNamed("createWindow", meProp(_me, "m_sEndStageWndTitle"), "vmk_fw_modal.window")) {
  var tWnd = callNamed("getWindow", meProp(_me, "m_sEndStageWndTitle"));
  switch (a_qual) {
case symbol("qualified"):
  callMethod("merge", tWnd, "vmk_fw_nextlevel.window")
  break;
case symbol("disqualified"):
  callMethod("merge", tWnd, "vmk_fw_gameover.window")
  break;
case symbol("gameover"):
  callMethod("merge", tWnd, "vmk_fw_congratulations.window")
  break;
  }

  callMethod("merge", tWnd, "vmk_fw_ranking.window")
  callMethod("center", tWnd)
  callMethod("moveBy", tWnd, 0, -float(30))
  callMethod("fixAntiAliasing", _me, tWnd, "fw.dialog.hd", 1)
  callMethod("fixAntiAliasing", _me, tWnd, "fw.returntoroom.text", 1)
  callMethod("fixAntiAliasing", _me, tWnd, "fw.gamestart.count", 1)
  callMethod("fixAntiAliasing", _me, tWnd, "fw.gamestart.seconds", 1)
  callMethod("fixAntiAliasing", _me, tWnd, "fw.levelstart.text", 1)
  callMethod("fixAntiAliasing", _me, tWnd, "fw.status.hd", 1)
  callMethod("changeImageInElement", _me, tWnd, "rank1", callNamed("member", "fw_1"))
  callMethod("changeImageInElement", _me, tWnd, "rank2", callNamed("member", "fw_2"))
  callMethod("changeImageInElement", _me, tWnd, "rank3", callNamed("member", "fw_3"))
  callMethod("changeImageInElement", _me, tWnd, "rank1.", callNamed("member", "fw_."))
  callMethod("changeImageInElement", _me, tWnd, "rank2.", callNamed("member", "fw_."))
  callMethod("changeImageInElement", _me, tWnd, "rank3.", callNamed("member", "fw_."))
  for (var i = 1; i <= 3; ++i) {
  var tElement = callMethod("getElement", tWnd, lingoBinary("join", "fw.avatar", i));
  callMethod("hide", tElement)
  }

  callMethod("setText", callMethod("getElement", tWnd, "fw.dialog.hd"), callNamed("getText", "fw.roundranking.title"))
  for (var i = 1; i <= a_mp_top15.count; ++i) {
  var tAvatarID = callMethod("getPropAt", a_mp_top15, i);
  var tScore = a_mp_top15[i];
  var tColor = callNamed("rgb", "#EFEFEF");
  if (lingoBinary("lt", tScore, a_iLowestQual)) {
  var t_sDropColor = callNamed("getText", "fw.player.drop.color", "#000000");
  tColor = callNamed("rgb", t_sDropColor);
  }

  if (lingoBinary("neq", tAvatarID, -float(1))) {
  if (lingoBinary("lt", i, 4)) {
  tColor = callNamed("rgb", "#000000");
  var t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("figure")] = callMethod("GetAvatarFigureData", callMethod("getComponent", _me), tAvatarID);
  t_ar_data[symbol("Output")] = undefined;
  t_ar_data[symbol("Dir")] = new LingoList([4, 4]);
  if (lingoBinary("eq", i, 1)) {
  t_ar_data[symbol("act")] = new LingoList([101, 0]);
  } else {
  t_ar_data[symbol("act")] = new LingoList([0, 0]);
  }

  if (lingoBinary("gt", t_ar_data[symbol("figure")].count, 0)) {
  callNamed("executeMessage", "GetAvatarImage", t_ar_data)
  } else {
  t_ar_data[symbol("input")] = new LingoList([2, 4, 4, 1]);
  callNamed("executeMessage", "RandomAvatar", t_ar_data)
  }

  tElement = callMethod("getElement", tWnd, lingoBinary("join", "fw.avatar", i));
  callMethod("show", tElement)
  var tSprite = callMethod("getProperty", tElement, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "ink", 8);
  setThePropOf(tSprite.member, "image", t_ar_data[symbol("Output")]);
  setThePropOf(tSprite.member, "regPoint", callNamed("point", 0, 20));
  setThePropOf(tSprite, "width", tSprite.member.width);
  setThePropOf(tSprite, "height", tSprite.member.height);
  setThePropOf(tSprite.member, "useAlpha", 1);
  }

  }

  tElement = callMethod("getElement", tWnd, lingoBinary("join", "fw.roundrank.name", i));
  var tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, callMethod("GetAvatarName", callMethod("getComponent", _me), tAvatarID))
  tElement = callMethod("getElement", tWnd, lingoBinary("join", "fw.rank", i));
  if (callNamed("objectp", tElement)) {
  tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, lingoBinary("join", callNamed("string", i), "."))
  }

  tElement = callMethod("getElement", tWnd, lingoBinary("join", "fw.score", i));
  tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, lingoBinary("joinPad", callNamed("string", tScore), callNamed("getText", "fw_roundranking_points")))
  }

  }

  if (lingoBinary("gt", a_iRank, 15)) {
  tColor = callNamed("rgb", "#FFCC00");
  tElement = callMethod("getElement", tWnd, "fw.yourrank.hd");
  tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, a_iRank)
  tElement = callMethod("getElement", tWnd, "fw.roundrank.ownname");
  tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, callMethod("get", callNamed("getObject", symbol("session")), "name"))
  tElement = callMethod("getElement", tWnd, "fw.yourscore");
  tFont = callMethod("getFont", tElement);
  tFont[symbol("color")] = tColor;
  callMethod("setFont", tElement, tFont)
  callMethod("setText", tElement, a_iScore)
  } else {
  callMethod("setText", callMethod("getElement", tWnd, "fw.yourrank.hd"), "")
  callMethod("setText", callMethod("getElement", tWnd, "fw.roundrank.ownname"), "")
  callMethod("setText", callMethod("getElement", tWnd, "fw.yourscore"), "")
  }

  setMeProp(_me, "m_iStageStartCount", a_iTime);
  callNamed("createTimeout", "FWMidStageCountdown", 1000, symbol("dropasec"), callMethod("getID", _me), undefined, a_iTime)
  }

}

