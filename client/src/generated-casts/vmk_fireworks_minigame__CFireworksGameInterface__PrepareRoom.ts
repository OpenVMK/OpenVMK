// vmk_fireworks_minigame.cct / CFireworksGameInterface / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  callNamed("put", "CFireworksGameInterface::PrepareRoom - begin")
  callNamed("executeMessage", "StopRoomSound")
  var t_rMod = callNamed("getWindow", "mod_wnd");
  if (callNamed("objectp", t_rMod)) {
  callMethod("hide", t_rMod)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_numbers").count, 0)) {
  setMeProp(_me, "m_ar_numbers", callMethod("generateBitmapNumbers", _me));
  }

  callNamed("createWindow", "fwselector", "vmk_fw_interface.window")
  setMeProp(_me, "m_fireWorkSelector", callNamed("getWindow", "fwselector"));
  callMethod("center", meProp(_me, "m_fireWorkSelector"))
  callMethod("moveZ", meProp(_me, "m_fireWorkSelector"), 5000)
  callMethod("hide", meProp(_me, "m_fireWorkSelector"))
  callMethod("registerProcedure", meProp(_me, "m_fireWorkSelector"), symbol("eventProcTest"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("changeImageInElement", _me, meProp(_me, "m_fireWorkSelector"), "bonusx", callNamed("member", "fw_x"))
  callMethod("changeImageInElement", _me, meProp(_me, "m_fireWorkSelector"), "bonus.", callNamed("member", "fw_."))
  callMethod("toggleControlMethod", _me, 1)
  callMethod("fixAntiAliasing", _me, meProp(_me, "m_fireWorkSelector"), "fw.rankstatus.1")
  callMethod("fixAntiAliasing", _me, meProp(_me, "m_fireWorkSelector"), "fw.rankstatus.2")
  callMethod("fixAntiAliasing", _me, meProp(_me, "m_fireWorkSelector"), "fw.rankstatus.3")
  setMeProp(_me, "m_ar_hideElements", new LingoList(["fw.incoming.1", "fw.incoming.2", "fireworks.amount.1", "fireworks.amount.10", "bonus1.0", "bonus.", "bonus0.1", "bonusx"]));
  for (var i = 1; i <= 3; ++i) {
  var t_ar_scoreDisplay = new LingoList([]);
  for (var n = 0; n <= 5; ++n) {
  callMethod("append", meProp(_me, "m_ar_hideElements"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "score", i), "."), "n"), n))
  var t_rSprite = callMethod("getElementSprite", _me, meProp(_me, "m_fireWorkSelector"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "score", i), "."), "n"), n));
  callMethod("append", t_ar_scoreDisplay, t_rSprite)
  setThePropOf(t_rSprite, "member", callNamed("getNumberImg", 0));
  }

  var t_sElem = lingoBinary("join", "fw.rankstatus.", i);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_fireWorkSelector"), t_sElem), lingoBinary("joinPad", lingoBinary("join", i, "."), ""))
  callMethod("append", meProp(_me, "m_ar_hideElements"), t_sElem)
  callMethod("append", meProp(_me, "m_ar_scoreDisplay"), t_ar_scoreDisplay)
  }

  for (var t_sElement of meProp(_me, "m_ar_hideElements").toArray()) {
  }

  setMeProp(_me, "m_ar_fwAmountDisplay", new LingoList([]));
  callMethod("append", meProp(_me, "m_ar_fwAmountDisplay"), callMethod("getElementSprite", _me, meProp(_me, "m_fireWorkSelector"), "fireworks.amount.1"))
  callMethod("append", meProp(_me, "m_ar_fwAmountDisplay"), callMethod("getElementSprite", _me, meProp(_me, "m_fireWorkSelector"), "fireworks.amount.10"))
  for (var t_rSprite of meProp(_me, "m_ar_fwAmountDisplay").toArray()) {
  setThePropOf(t_rSprite, "member", callNamed("getNumberImg", 0));
  }

  setMeProp(_me, "m_ar_bonusDisplay", new LingoList([]));
  callMethod("append", meProp(_me, "m_ar_bonusDisplay"), callMethod("getElementSprite", _me, meProp(_me, "m_fireWorkSelector"), "bonus0.1"))
  callMethod("append", meProp(_me, "m_ar_bonusDisplay"), callMethod("getElementSprite", _me, meProp(_me, "m_fireWorkSelector"), "bonus1.0"))
  for (var t_rSprite of meProp(_me, "m_ar_bonusDisplay").toArray()) {
  setThePropOf(t_rSprite, "member", callNamed("getNumberImg", 0));
  }

  setMeProp(_me, "m_ar_fwSpritelist", new LingoList([]));
  setMeProp(_me, "m_ar_vicinityList", new LingoList([]));
  setMeProp(_me, "m_ar_pulse", new LingoList([]));
  for (var i = 1; i <= 30; ++i) {
  var t_rSpr = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSpr, "member", undefined);
  setThePropOf(t_rSpr, "ink", 33);
  setThePropOf(t_rSpr, "blend", 50);
  setThePropOf(t_rSpr, "locZ", -float(50));
  setThePropOf(t_rSpr, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSpr, "visible", 0);
  meProp(_me, "m_ar_fwSpritelist")[i] = t_rSpr;
  meProp(_me, "m_ar_vicinityList")[i] = float(1);
  meProp(_me, "m_ar_pulse")[i] = float(0);
  meProp(_me, "m_ar_mp_flashList")[i] = new LingoPropList([symbol("frame"), 0, symbol("sprite"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)))]);
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i].sprite, "locZ", -float(49));
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i].sprite, "member", undefined);
  setThePropOf(meProp(_me, "m_ar_mp_flashList")[i].sprite, "ink", 33);
  }

  for (var i = 1; i <= 8; ++i) {
  t_rSpr = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSpr, "member", undefined);
  setThePropOf(t_rSpr, "ink", 36);
  setThePropOf(t_rSpr, "blend", 50);
  setThePropOf(t_rSpr, "locZ", -float(50));
  setThePropOf(t_rSpr, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSpr, "visible", 0);
  meProp(_me, "m_rDisplayComboStatusSprites")[i] = t_rSpr;
  }

  setMeProp(_me, "m_rDisplayComboAwardSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  callNamed("put", "hey")
  var t_iMemNum = callNamed("createMember", lingoBinary("join", meProp(_me, "m_sDisplayComboAwardWriter"), ".image"), symbol("bitmap"));
  if (lingoBinary("gt", t_iMemNum, 0)) {
  setThePropOf(callNamed("member", t_iMemNum), "image", callNamed("image", 1, 1, 32));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "member", callNamed("member", t_iMemNum));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "locZ", -float(25));
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "width", meProp(_me, "m_rDisplayComboAwardSprite").member.image.width);
  setThePropOf(meProp(_me, "m_rDisplayComboAwardSprite"), "height", meProp(_me, "m_rDisplayComboAwardSprite").member.image.height);
  } else {
  callNamed("put", "Could not init display-combo-award")
  }

  callNamed("put", "ho")
  setMeProp(_me, "m_iIconSpacing", 55);
  setMeProp(_me, "m_sCurrentSelection", "");
  setMeProp(_me, "m_iCurrentSelection", 1);
  setMeProp(_me, "m_iStageStartCount", 0);
  setMeProp(_me, "m_oldMousedownScript", theProperty("mouseDownScript"));
  setTheProperty("mouseDownScript", "FWMouseDown");
  setMeProp(_me, "m_ar_clicks", new LingoList([]));
  for (var i = 1; i <= 10; ++i) {
  t_rSpr = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSpr, "member", undefined);
  setThePropOf(t_rSpr, "ink", 36);
  setThePropOf(t_rSpr, "locZ", -float(50));
  setThePropOf(t_rSpr, "loc", callNamed("point", -float(1000), -float(1000)));
  meProp(_me, "m_ar_comments")[i] = new LingoPropList([symbol("sprite"), t_rSpr, symbol("time"), 0]);
  }

  var tMetrics = new LingoPropList([symbol("font"), "Folio BoldCondensed *", symbol("fontSize"), 36, symbol("lineHeight"), 38, symbol("fixedLineSpace"), 38, symbol("color"), callNamed("rgb", "#FEFEFE"), symbol("ilk"), symbol("struct"), symbol("fontStyle"), new LingoList([symbol("plain")])]);
  callNamed("createWriter", "fireworks_score", tMetrics)
  setMeProp(_me, "m_rscorewriter", callNamed("getWriter", "fireworks_score"));
  setMeProp(_me, "m_ar_mp_selector", new LingoList([]));
  setMeProp(_me, "m_rSelectorSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "locZ", 0);
  callMethod("showSelectorWindow", _me)
  callMethod("append", meProp(_me, "m_ar_sprGraphicCursor"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  callMethod("append", meProp(_me, "m_ar_sprGraphicCursor"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[1], "member", callNamed("member", "cursor.aim"));
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[1], "width", meProp(_me, "m_ar_sprGraphicCursor")[1].member.width);
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[1], "height", meProp(_me, "m_ar_sprGraphicCursor")[1].member.height);
  callMethod("cursor", _player, 200)
  callNamed("executeMessage", symbol("ui_hide"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_prepared", 0);
  callMethod("activateExplodeAll", _me, 1)
  callNamed("put", "CFireworksGameInterface::PrepareRoom - end")
}

