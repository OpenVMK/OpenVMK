// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / parseToServerFormat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseToServerFormat(_me: LingoMe, _this: LingoValue) {
  var t_mp_dataToServer = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_ar_PropsToServer").count; ++i) {
  var t_sColor = meProp(_me, "m_ar_PropsToServer")[i]["Color"];
  if (lingoBinary("eq", t_sColor, -float(1))) {
  var t_iLocinColorList = -float(1);
  } else {
  for (var f = 1; f <= meProp(_me, "m_ar_FigureColorList").count; ++f) {
  if (lingoBinary("eq", meProp(_me, "m_ar_FigureColorList")[f], t_sColor)) {
  t_iLocinColorList = callMethod("getPropAt", meProp(_me, "m_ar_FigureColorList"), f);
  }

  }

  }

  callMethod("addProp", t_mp_dataToServer, symbol("integer"), callNamed("value", meProp(_me, "m_ar_PropsToServer")[i]["SetID"]))
  if (lingoBinary("eq", meProp(_me, "m_ar_PropsToServer")[i]["SetID"], -float(1))) {
  callMethod("addProp", t_mp_dataToServer, symbol("integer"), -float(1))
  continue;
  }

  callMethod("addProp", t_mp_dataToServer, symbol("integer"), callNamed("value", t_iLocinColorList))
  }

  if (lingoBinary("gt", t_mp_dataToServer.count, 0)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "CHANGEFIGURE", t_mp_dataToServer)
  }

}

