// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iVehicle", 0);
  setMeProp(_me, "m_iDir", 0);
  setMeProp(_me, "m_iAnimCounter", 0);
  setMeProp(_me, "m_FxSnd_obj", undefined);
  setMeProp(_me, "m_iCurrendSoundPlaying", 0);
  callNamed("registerMessage", symbol("set_FxOff"), callMethod("getID", _this), symbol("setFxOff"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("setFxOff"))
  callNamed("registerMessage", "close_Settings", callMethod("getID", _this), symbol("checkSoundSettings"))
  var t_ar_ColorList = new LingoList([new LingoList(["61FF9C", "00A3A5"]), new LingoList(["E597FF", "9B1FDB"]), new LingoList(["FFF297", "EDB200"]), new LingoList(["97D9FF", "0D79DE"])]);
  setMeProp(_me, "m_ar_ALiceColors", t_ar_ColorList[callNamed("random", t_ar_ColorList.count)]);
  var t_ar_List = new LingoList(["1374E2", "E2AF13", "13E296"]);
  setMeProp(_me, "m_ar_PeterPanColor", callNamed("rgb", t_ar_List[callNamed("random", 3)]));
  return 1;
}

