// vmk_pirates2_minigame.cct / COilVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tAge = callMethod("GetParam", callMethod("getObject", _me), "Age");
  var ttype = callMethod("GetParam", callMethod("getObject", _me), "Type");
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  for (var t_mp_flame of meProp(_me, "m_ar_mp_Flames").toArray()) {
  setThePropOf(t_mp_flame.spr, "member", meProp(_me, "m_ar_rFireAnim")[t_mp_flame.frame]);
  setThePropOf(t_mp_flame.spr, "width", t_mp_flame.spr.member.width);
  setThePropOf(t_mp_flame.spr, "height", t_mp_flame.spr.member.height);
  setThePropOf(t_mp_flame, "frame", lingoBinary("add", t_mp_flame.frame, 1));
  if (lingoBinary("gt", t_mp_flame.frame, meProp(_me, "m_ar_rFireAnim").count)) {
  setThePropOf(t_mp_flame, "frame", 1);
  }

  }

  var tloc = callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y));
  setThePropOf(meProp(_me, "m_sprite"), "loc", tloc);
  setThePropOf(meProp(_me, "m_ar_mp_Flames")[1].spr, "loc", lingoBinary("add", tloc, callNamed("point", 0, -float(10))));
  setThePropOf(meProp(_me, "m_ar_mp_Flames")[2].spr, "loc", lingoBinary("add", tloc, callNamed("point", 15, -float(5))));
  setThePropOf(meProp(_me, "m_ar_mp_Flames")[3].spr, "loc", lingoBinary("add", tloc, callNamed("point", -float(18), -float(2))));
  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_sprite")]), 0)
  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_ar_mp_Flames")[1].spr, meProp(_me, "m_ar_mp_Flames")[2].spr, meProp(_me, "m_ar_mp_Flames")[3].spr]), 1)
}

