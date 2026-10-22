// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / createItemConfigurationDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createItemConfigurationDialog(_me: LingoMe, i_iRef: LingoValue, a_ar_Configuration: LingoValue) {
  setMeProp(_me, "m_ar_oldConfiguration", meProp(_me, "m_ar_configuration"));
  var t_ar_windowDescriptions = new LingoList(["vmk_basic.window", "dark_ride_configuration.window"]);
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sConfigurationWindowID")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sConfigurationWindowID"))
  }

  var t_bSuccess = callNamed("createWindow", meProp(_me, "m_sConfigurationWindowID"), undefined, 0, 0, symbol("modal"));
  if (t_bSuccess) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sConfigurationWindowID"));
  for (var t_sWinDesc of t_ar_windowDescriptions.toArray()) {
  t_bSuccess = callMethod("merge", t_rWindow, t_sWinDesc);
  }

  callMethod("center", t_rWindow)
  for (var i = 1; i <= a_ar_Configuration.count; ++i) {
  var t_sDir = callMethod("getPropAt", a_ar_Configuration, i);
  var t_iDir = a_ar_Configuration[i];
  callMethod("activateDirection", _me, t_sDir, t_iDir)
  }

  callMethod("setText", callMethod("getElement", t_rWindow, "basic.window.title"), callNamed("getText", "item.configuration.darkride.title"))
  callMethod("registerClient", t_rWindow, callMethod("getID", _me))
  callMethod("registerProcedure", t_rWindow, symbol("_ConfigurationEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  return meProp(_me, "m_sConfigurationWindowID");
  }

}

