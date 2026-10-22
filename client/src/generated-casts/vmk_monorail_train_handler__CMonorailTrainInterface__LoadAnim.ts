// vmk_monorail_train_handler.cct / CMonorailTrainInterface / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  meProp(_me, "m_animIDs")[1] = callMethod("LoadAnim", tAnimEngine, "monorail_train_doors_open_arrangement");
  meProp(_me, "m_animIDs")[2] = callMethod("LoadAnim", tAnimEngine, "monorail_train_doors_close_arrangement");
  meProp(_me, "m_animIDs")[3] = callMethod("LoadAnim", tAnimEngine, "monorail_train_lcd_arrangement");
  meProp(_me, "m_animIDs")[4] = callMethod("LoadAnim", tAnimEngine, "monorail_train_rails_arrangement");
  meProp(_me, "m_animIDs")[5] = callMethod("LoadAnim", tAnimEngine, "monorail_train_doors_closed_arrangement");
  }

}

