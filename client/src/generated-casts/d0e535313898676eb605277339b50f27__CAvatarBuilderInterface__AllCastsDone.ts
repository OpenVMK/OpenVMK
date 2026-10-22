// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / AllCastsDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllCastsDone(_me: LingoMe, _this: LingoValue) {
  callNamed("createObject", "EmoticonMenu", "CEmoticons")
  callNamed("createObject", "MagicMenu", "CMagicMenu")
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), "CAvatarBuilderPageBase"));
  setMeProp(_me, "m_rCurPageObj2", callNamed("createObject", callNamed("getUniqueID"), "CSettingsPageBase"));
}

