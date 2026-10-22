// d0e535313898676eb605277339b50f27.cct / CClothesPreviewRenderer / CreteObjectsPool

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreteObjectsPool(_me: LingoMe) {
  var t_ar_Parts = new LingoList(["ht", "hd", "hr", "fc", "ey", "tr", "rh", "ri", "lh", "li", "llg", "rlg", "ls", "rs", "ch", "ch2", "lsh", "rsh", "lpn", "rpn"]);
  for (var i = 1; i <= t_ar_Parts.count; ++i) {
  var t_sName = t_ar_Parts[i];
  switch (t_sName) {
case "llg":
case "rlg":
case "lsh":
case "rsh":
case "lpn":
case "rpn":
  t_sName = "lg";
  break;
case "ls":
  t_sName = "llg";
  break;
case "rs":
  t_sName = "rlg";
  break;
  break;
  break;
  break;
  break;
  break;
  }

  var t_sObjectName = lingoBinary("join", "CBodypartClass_", t_sName);
  if (callNamed("memberExists", t_sObjectName)) {
  var t_PartObj = callNamed("createObject", symbol("temp"), t_sObjectName);
  } else {
  t_PartObj = callNamed("createObject", symbol("temp"), "CBodypartClass");
  }

  callMethod("addProp", meProp(_me, "m_mp_ObjectPool"), t_ar_Parts[i], t_PartObj)
  }

}

