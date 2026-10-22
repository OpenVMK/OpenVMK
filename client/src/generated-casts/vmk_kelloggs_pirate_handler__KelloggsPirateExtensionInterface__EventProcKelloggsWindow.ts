// vmk_kelloggs_pirate_handler.cct / KelloggsPirateExtensionInterface / EventProcKelloggsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcKelloggsWindow(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sKelloggsWindowTitle"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), "help.kelloggs.promo")
  break;
case "quest.vmksite":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_sURL = callNamed("getText", "kelloggs.promo.url");
  if (lingoBinary("or", lingoBinary("eq", t_sURL, 0), lingoBinary("eq", t_sURL, "kelloggs.promo.url"))) {
  } else {
  callNamed("gotoNetPage", t_sURL, "_new")
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Kelloggs element", tElemID))
  }

  }

}

