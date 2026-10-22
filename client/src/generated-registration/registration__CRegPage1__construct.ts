// registration.cct / CRegPage1 / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_PropsToServer", new LingoPropList([]));
  setMeProp(_me, "m_ar_availableSets", undefined);
  setMeProp(_me, "m_mp_AllSets", new LingoList([]));
  var m_mp_AvatarInstances = new LingoPropList([]);
  setMeProp(_me, "m_ar_BodyPartList", new LingoList([]));
  setMeProp(_me, "m_ar_BodyPartObjects", new LingoPropList([]));
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_bBoyState", 1);
  setMeProp(_me, "m_bGirlState", 0);
  setMeProp(_me, "m_bDataGathered", 1);
  setMeProp(_me, "m_sSex", "M");
  setMeProp(_me, "m_CurrentHairCol", undefined);
  setMeProp(_me, "m_CurrentSkinCol", undefined);
  setMeProp(_me, "m_ar_RoomList", undefined);
  setMeProp(_me, "m_iSelectedRoom", 1);
  setMeProp(_me, "m_rComponentsPage", undefined);
  setMeProp(_me, "m_sActiveName", "");
  var m_sTimerId = "";
  callMethod("DumpSetlists", _this)
  setMeProp(_me, "m_ar_SetContents", new LingoPropList(["hr", new LingoList(["hr"]), "hd", new LingoList(["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"]), "ch", new LingoList(["ch", "ch2", "ls", "rs"]), "pn", new LingoList(["lpn", "rpn"]), "sh", new LingoList(["lsh", "rsh"]), "ht", new LingoList(["ht"])]));
  setMeProp(_me, "m_NoHat_Img", callNamed("member", callNamed("getmemnum", "nohats.preview")).image);
  return 1;
}

