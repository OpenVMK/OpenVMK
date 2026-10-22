// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / eventProcSpecialError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcSpecialError(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "close":
case "btn_ok":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", "ErrorDialogSpecial")
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("open_help_page"), "help.dialog.windows")
  callNamed("removeWindow", "ErrorDialogSpecial")
  break;
  break;
  }

  }

}

