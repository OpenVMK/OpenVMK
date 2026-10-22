// vmk_furniture_code.cct / CRoomItemProximityConfig / _ConfigurationEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ConfigurationEventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sConfigurationWindowID"));
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "darkride.dir.f.0":
case "darkride.dir.f.1":
case "darkride.dir.f.2":
case "darkride.dir.f.3":
case "darkride.dir.f.4":
case "darkride.dir.f.5":
  callMethod("clickRadioButton", _me, "f", a_sElemID)
  break;
case "darkride.dir.r.0":
case "darkride.dir.r.1":
case "darkride.dir.r.2":
case "darkride.dir.r.3":
case "darkride.dir.r.4":
case "darkride.dir.r.5":
  callMethod("clickRadioButton", _me, "r", a_sElemID)
  break;
case "darkride.dir.b.0":
case "darkride.dir.b.1":
case "darkride.dir.b.2":
case "darkride.dir.b.3":
case "darkride.dir.b.4":
case "darkride.dir.b.5":
  callMethod("clickRadioButton", _me, "b", a_sElemID)
  break;
case "darkride.dir.l.0":
case "darkride.dir.l.1":
case "darkride.dir.l.2":
case "darkride.dir.l.3":
case "darkride.dir.l.4":
case "darkride.dir.l.5":
  callMethod("clickRadioButton", _me, "l", a_sElemID)
  break;
case "darkride.dir.fl.0":
case "darkride.dir.fl.1":
  callMethod("clickRadioButton", _me, "fl", a_sElemID)
  break;
case "darkride.dir.fr.0":
case "darkride.dir.fr.1":
  callMethod("clickRadioButton", _me, "fr", a_sElemID)
  break;
case "darkride.dir.br.0":
case "darkride.dir.br.1":
  callMethod("clickRadioButton", _me, "br", a_sElemID)
  break;
case "darkride.dir.bl.0":
case "darkride.dir.bl.1":
  callMethod("clickRadioButton", _me, "bl", a_sElemID)
  break;
case "btn.ok":
  var t_ar_data = new LingoPropList([]);
  callMethod("addProp", t_ar_data, symbol("int"), meProp(_me, "m_iRef"))
  callMethod("addProp", t_ar_data, symbol("int"), meProp(_me, "m_ar_configuration").count)
  for (var i = 1; i <= meProp(_me, "m_ar_configuration").count; ++i) {
  var t_sDir = callMethod("getPropAt", meProp(_me, "m_ar_configuration"), i);
  var t_sValue = callNamed("string", meProp(_me, "m_ar_configuration")[i]);
  callMethod("addProp", t_ar_data, symbol("str"), t_sDir)
  callMethod("addProp", t_ar_data, symbol("str"), t_sValue)
  }

  callMethod("send", callNamed("getConnection", "VMK"), "ConfigureItem", t_ar_data)
  callNamed("removeWindow", meProp(_me, "m_sConfigurationWindowID"))
  break;
case "close":
case "btn.cancel":
  callNamed("removeWindow", meProp(_me, "m_sConfigurationWindowID"))
  setMeProp(_me, "m_ar_configuration", meProp(_me, "m_ar_oldConfiguration"));
  setMeProp(_me, "m_bReady", 0);
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.darkride", 1)
  break;
  default:
  callNamed("put", a_sElemID)
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

}

