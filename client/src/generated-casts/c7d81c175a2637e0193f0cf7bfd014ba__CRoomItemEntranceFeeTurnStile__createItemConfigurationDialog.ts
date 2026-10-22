// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemEntranceFeeTurnStile / createItemConfigurationDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createItemConfigurationDialog(_me: LingoMe, _this: LingoValue, i_iRef: LingoValue, a_ar_Configuration: LingoValue) {
  var t_iCost = callNamed("integer", a_ar_Configuration["fee"]);
  setMeProp(_me, "m_iCollectableCredits", callNamed("integer", a_ar_Configuration["credits"]));
  var t_ar_windowDescriptions = new LingoList(["vmk_basic.window", "vmk_turnstile_price.window"]);
  var t_sID = "vmk_turnstile_price";
  if (lingoBinary("neq", callNamed("getWindow", t_sID), 0)) {
  callNamed("removeWindow", t_sID)
  }

  var t_bSuccess = callNamed("createWindow", t_sID, undefined, 0, 0, symbol("modal"));
  if (t_bSuccess) {
  var t_rWindow = callNamed("getWindow", t_sID);
  for (var t_sWinDesc of t_ar_windowDescriptions.toArray()) {
  t_bSuccess = callMethod("merge", t_rWindow, t_sWinDesc);
  }

  callMethod("center", t_rWindow)
  var t_rRadioButton = callMethod("createRadioButton", _this, t_sID);
  if (callNamed("objectp", t_rRadioButton)) {
  var t_sActiveRadio = "quest.duration1";
  switch (t_iCost) {
case meProp(_me, "m_iFee0"):
  t_sActiveRadio = "quest.duration1";
  break;
case meProp(_me, "m_iFee1"):
  t_sActiveRadio = "quest.duration2";
  break;
case meProp(_me, "m_iFee2"):
  t_sActiveRadio = "quest.duration3";
  break;
case meProp(_me, "m_iFee3"):
  t_sActiveRadio = "quest.duration4";
  break;
  }

  callMethod("clickElement", t_rRadioButton, t_sActiveRadio)
  callMethod("updateMenu", t_rRadioButton)
  }

  callMethod("setText", callMethod("getElement", t_rWindow, "basic.window.title"), callNamed("getText", "item.configuration.title"))
  callMethod("setButtonTxt", _this, t_rWindow, "basic.dialog.button2", callNamed("getText", "mes.accept"))
  callMethod("setButtonTxt", _this, t_rWindow, "basic.dialog.button1", callNamed("getText", "mes.deny"))
  var t_txt = callNamed("getText", "turnstile.credits.amount");
  t_txt = callNamed("replaceChunks", t_txt, "%credits%", meProp(_me, "m_iCollectableCredits"));
  var t_rElem = callMethod("getElement", t_rWindow, "turnstile.collect.info");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_txt)
  }

  if (lingoBinary("eq", meProp(_me, "m_iCollectableCredits"), 0)) {
  t_rElem = callMethod("getElement", t_rWindow, "turnstile.collect.button");
  if (callNamed("objectp", t_rElem)) {
  callMethod("deactivate", t_rElem)
  }

  }

  callMethod("registerClient", t_rWindow, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWindow, symbol("_ConfigurationEventProc"), callMethod("getID", _this), symbol("mouseUp"))
  return t_sID;
  }

}

