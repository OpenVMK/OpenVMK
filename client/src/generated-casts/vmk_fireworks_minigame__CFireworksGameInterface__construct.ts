// vmk_fireworks_minigame.cct / CFireworksGameInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("put", "CFireworksGameInterface::construct - begin")
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_bExplodeAllActive", 1);
  setMeProp(_me, "m_rSelectorSprite", undefined);
  setMeProp(_me, "m_ar_fwSpritelist", new LingoList([]));
  var m_ar_selectorSpriteList = new LingoList([]);
  setMeProp(_me, "m_oldKeydownScript", "");
  setMeProp(_me, "m_ar_comments", new LingoList([]));
  setMeProp(_me, "m_sEndStageWndTitle", "FireworksEndStage");
  setMeProp(_me, "m_ar_sprGraphicCursor", new LingoList([]));
  setMeProp(_me, "m_ar_memberAimCursor", new LingoList([]));
  setMeProp(_me, "m_ar_mp_flashList", new LingoList([]));
  setMeProp(_me, "m_ar_mFlashAnim", new LingoList(["fw.flash.01", "fw.flash.02", "fw.flash.03", "fw.flash.04", "fw.flash.05"]));
  setMeProp(_me, "m_bKeyIsDown", 0);
  setMeProp(_me, "m_ar_numbers", new LingoList([]));
  setMeProp(_me, "m_ar_hideElements", new LingoList([]));
  setMeProp(_me, "m_ar_scoreDisplay", new LingoList([]));
  setMeProp(_me, "m_ar_bonusDisplay", new LingoList([]));
  setMeProp(_me, "m_ar_fwAmountDisplay", new LingoList([]));
  setMeProp(_me, "m_rDisplayComboStatusSprites", new LingoList([]));
  setMeProp(_me, "m_rDisplayComboAwardSprite", undefined);
  setMeProp(_me, "m_rStageInfoWindow", undefined);
  setMeProp(_me, "m_ar_selectorLocations", callMethod("new", callNamed("script", "CVectorStruct")));
  var tWriterStyle = callNamed("getStructVariable", "struct.font.plain");
  callMethod("setaProp", tWriterStyle, symbol("color"), callNamed("rgb", "#EFEFFE"))
  callMethod("setaProp", tWriterStyle, symbol("bgColor"), callNamed("rgb", "#000000"))
  callMethod("setaProp", tWriterStyle, symbol("fixedLineSpace"), 20)
  callMethod("setaProp", tWriterStyle, symbol("lineHeight"), 20)
  callMethod("setaProp", tWriterStyle, symbol("fontSize"), 20)
  callMethod("setaProp", tWriterStyle, symbol("font"), "Folio BoldCondensed *")
  callMethod("setaProp", tWriterStyle, symbol("alignment"), symbol("left"))
  setMeProp(_me, "m_sDisplayComboAwardWriter", "fireworks_combo_writer");
  callNamed("createWriter", meProp(_me, "m_sDisplayComboAwardWriter"))
  callMethod("Define", callNamed("getWriter", meProp(_me, "m_sDisplayComboAwardWriter")), tWriterStyle)
}

