-- Behavior
on CreateSpecialServices
  return createManager(#special_services, GetClsVariable("special.services.class"))
end
on RemoveSpecialServices
  return removeManager(#special_services)
end
on getSpecialServices
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#special_services) then
    return t_rMgr.getManager(#special_services)
  else
    return CreateSpecialServices()
  end if
end
on try
  return getSpecialServices().try()
end
on Throw a_sErrStr
  return getSpecialServices().Throw(a_sErrStr)
end
on catch a_sErrStr
  return getSpecialServices().catch(a_sErrStr)
end
on createToolTip a_sText
  return getSpecialServices().createToolTip(a_sText)
end
on removeToolTip
  return getSpecialServices().removeToolTip()
end
on setcursor a_kType
  return getSpecialServices().setcursor(a_kType)
end
on openNetPage a_sURL_key
  return getSpecialServices().openNetPage(a_sURL_key)
end
on showLoadingBar a_sLoadID, a_mp_Props
  return getSpecialServices().showLoadingBar(a_sLoadID, a_mp_Props)
end
on getUniqueID
  return getSpecialServices().getUniqueID()
end
on getMachineID
  return getSpecialServices().getMachineID()
end
on secretDecode a_sKey
  return getSpecialServices().secretDecode(a_sKey)
end
on readValueFromField a_sFieldName, a_cDelimiter, a_sSearchedKey
  return getSpecialServices().readValueFromField(a_sFieldName, a_cDelimiter, a_sSearchedKey)
end
on performance
  if objectExists(#perfTester) then
    return removeObject(#perfTester)
  else
    return createObject(#perfTester, GetClsVariable("perf.test.class"))
  end if
end
on printMsg a_rObj, a_sMsg
  getSpecialServices().print(a_rObj, a_sMsg)
end