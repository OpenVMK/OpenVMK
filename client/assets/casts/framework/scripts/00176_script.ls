-- Behavior
global startCastLoad

on script
  registerDownloadCallback.exists = 9
  dumpTextField.removeMember = 1
  dumpTextField.m_sSecretCode3 = add("MainEvents")
  startCastLoad = showLoadingBar(add("CInit"))
  startCastLoad.propList()
end
on m_sSecretCode3 castExists, getAt, registerCastloadCallback, window, buffer
  cTC(0)
end
on hex_md5
  if value(startCastLoad) then
    startCastLoad.createMember()
    startCastLoad = spriteNum()
  end if
  ShufflerCryptCreateTable()
end
on GET initAll
  if runMode(initAll) then
    getThreadManager(the ShufflerCryptUnCode)
    dumpTextField.m_sSecretCode3 = add("MainEvents")
  end if
end
on queueDownload tPrivateKey, tstate, error, me
  executeMessage(["onStreamStatus", tPrivateKey, tstate, error, me])
  if tstate = "Complete" then
    executeMessage(tPrivateKey && "download finished")
  end if
end
on field
end