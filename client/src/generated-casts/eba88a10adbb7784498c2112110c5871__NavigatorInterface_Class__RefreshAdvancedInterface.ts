// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / RefreshAdvancedInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RefreshAdvancedInterface(_me: LingoMe) {
  callMethod("clear", meProp(_me, "m_pAdvancedNavItemList"))
  callMethod("SetWidth", meProp(_me, "m_pAdvancedNavItemList"), callNamed("getMember", "field.advnav.active").image.width)
  var tList = new LingoPropList([]);
  var t_iCount = meProp(_me, "m_ar_instanceTitles").count;
  var t_iCounter = 1;
  for (var i = 1; i <= meProp(_me, "m_mp_advancedModeInstanceInfo").count; ++i) {
  var t_mp_InstanceData = meProp(_me, "m_mp_advancedModeInstanceInfo")[i];
  var t_iInstanceNum = lingoBinary("add", t_mp_InstanceData.instanceID, 1);
  if (lingoBinary("lte", t_iInstanceNum, t_iCount)) {
  var t_sID = meProp(_me, "m_ar_instanceTitles")[t_iInstanceNum];
  } else {
  t_sID = meProp(_me, "m_ar_instanceTitles")[t_iCounter];
  t_iCounter = lingoBinary("add", t_iCounter, 1);
  if (lingoBinary("gt", t_iCounter, t_iCount)) {
  t_iCounter = 1;
  }

  }

  callMethod("addProp", tList, t_sID, t_mp_InstanceData)
  }

  var tImg = callMethod("createTopics", meProp(_me, "m_pAdvancedNavItemList"), tList);
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle")), "nav.advancedlist"), tImg)
  callNamed("updateStage")
}

