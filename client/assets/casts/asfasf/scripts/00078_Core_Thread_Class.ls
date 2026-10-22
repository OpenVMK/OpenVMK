-- Script
property pState
property pLogoSpr

on construct this
  tSession = createObject(#session, getClassVariable("variable.manager.class"))
  tSession.set("client_startdate", the date)
  tSession.set("client_starttime", the long time)
  tSession.set("client_version", getVariable("system.version"))
  tSession.set("client_url", the moviePath)
  tSession.set("client_lastclick", EMPTY)
  createObject(#headers, getClassVariable("variable.manager.class"))
  createObject(#classes, getClassVariable("variable.manager.class"))
  createObject(#cache, getClassVariable("variable.manager.class"))
  createBroker(#Initialize)
  return this.updateState("load_variables")
end
on deconstruct this
  return this.hideLogo()
end
on showLogo this
  if memberExists("Logo") then
    tmember = member(getmemnum("Logo"))
    pLogoSpr = sprite(reserveSprite(this.getID()))
    pLogoSpr.ink = 0
    pLogoSpr.blend = 100
    pLogoSpr.member = tmember
    pLogoSpr.locZ = -20000001
    pLogoSpr.loc = point((the stage).rect.width / 2, (the stage).rect.height / 2 - (tmember.height / 2 + 20))
    pLogoSpr.width = member(getmemnum("Logo")).image.width
    pLogoSpr.height = member(getmemnum("Logo")).image.height
  end if
  return 1
end
on hideLogo this
  if pLogoSpr.ilk = #sprite then
    releaseSprite(pLogoSpr.spriteNum)
    pLogoSpr = VOID
  end if
  return 1
end
on updateState me, tstate
  case tstate of
    "load_variables":
      pState = tstate
      me.showLogo()
      cursor(4)
      if the runMode contains "Plugin" then
        tDelim = the itemDelimiter
        the itemDelimiter = "="
        repeat with i = 1 to 9
          tParam = externalParamValue("sw" & i)
          if not voidp(tParam) then
            if tParam.item.count > 1 then
              if tParam.item[1] = "external.variables.txt" then
                getVariableManager().set("external.variables.txt", tParam.item[2..tParam.item.count])
              end if
            end if
          end if
        end repeat
        the itemDelimiter = tDelim
      end if
      tURL = getVariableManager().get("external.variables.txt")
      tMemName = tURL
      if tURL contains "?" then
        tParamDelim = "&"
      else
        tParamDelim = "?"
      end if
      if the moviePath contains "http://" then
        tURL = tURL
      else
        if tURL contains "http://" then
          tURL = tURL
        end if
      end if
      tMemNum = queueDownload(tURL, tMemName, #field, 1)
      return registerDownloadCallback(tMemNum, #updateState, me.getID(), "load_params")
    "load_params":
      pState = tstate
      dumpVariableField(getVariable("external.variables.txt"))
      removeMember(getVariable("external.variables.txt"))
      if the runMode contains "Plugin" then
        tDelim = the itemDelimiter
        the itemDelimiter = "="
        repeat with i = 1 to 9
          tParam = externalParamValue("sw" & i)
          if not voidp(tParam) then
            if tParam.item.count > 1 then
              getVariableManager().set(tParam.item[1], tParam.item[2..tParam.item.count])
            end if
          end if
        end repeat
        the itemDelimiter = tDelim
      end if
      setDebugLevel(getIntVariable("system.debug", 0))
      getStringServices().initConvList()
      puppetTempo(getIntVariable("system.tempo", 30))
      if variableExists("client.reload.url") then
        getObject(#session).set("client_url", getVariable("client.reload.url"))
      end if
      if getIntVariable("system.debug") > 2 then
        getObjectManager().m_bLogger = 1
      end if
      return me.updateState("load_texts")
    "load_texts":
      pState = tstate
      tURL = getVariable("external.texts.txt")
      tMemName = tURL
      if tMemName = EMPTY or tMemName = 0 then
        return me.updateState("load_casts")
      end if
      if tURL contains "?" then
        tParamDelim = "&"
      else
        tParamDelim = "?"
      end if
      if the moviePath contains "http://" then
        tURL = tURL
      else
        if tURL contains "http://" then
          tURL = tURL
        end if
      end if
      tMemNum = queueDownload(tURL, tMemName, #field)
      return registerDownloadCallback(tMemNum, #updateState, me.getID(), "feed_texts")
    "feed_texts":
      pState = tstate
      if not getObject(#session).exists("ExternalTexts") then
        tTxtFile = getVariable("external.texts.txt")
        if tTxtFile <> 0 then
          if memberExists(tTxtFile) then
            dumpTextField(tTxtFile)
            removeMember(tTxtFile)
            getObject(#session).set("ExternalTexts", 1)
          end if
        end if
      end if
      tURL = getVariable("encrypted.texts.txt")
      tMemName = tURL
      if tMemName = EMPTY or tMemName = 0 then
        return me.updateState("load_casts")
      end if
      if tURL contains "?" then
        tParamDelim = "&"
      else
        tParamDelim = "?"
      end if
      if the moviePath contains "http://" then
        tURL = tURL
      else
        if tURL contains "http://" then
          tURL = tURL
        end if
      end if
      tMemNum = queueDownload(tURL, tMemName, #field)
      return registerDownloadCallback(tMemNum, #updateState, me.getID(), "load_casts")
    "load_casts":
      pState = tstate
      tCastList = []
      i = 1
      repeat while 1
        if not variableExists("cast.entry." & i) then
          exit repeat
        end if
        tFileName = getVariable("cast.entry." & i)
        tCastList.add(tFileName)
        i = i + 1
      end repeat
      if count(tCastList) > 0 then
        tLoadID = startCastLoad(tCastList, 1)
        if getVariable("loading.bar.active") then
          showLoadingBar(tLoadID, [#buffer: #window])
        end if
        return registerCastloadCallback(tLoadID, #updateState, me.getID(), "validate_resources")
      else
        return me.updateState("init_threads")
      end if
    "validate_resources":
      pState = tstate
      tCastList = []
      tNewList = []
      tVarMgr = getVariableManager()
      i = 1
      repeat while 1
        if not tVarMgr.exists("cast.entry." & i) then
          exit repeat
        end if
        tFileName = tVarMgr.get("cast.entry." & i)
        tCastList.add(tFileName)
        i = i + 1
      end repeat
      if count(tCastList) > 0 then
        repeat with tCast in tCastList
          if not castExists(tCast) then
            tNewList.add(tCast)
          end if
        end repeat
      end if
      if count(tNewList) > 0 then
        tLoadID = startCastLoad(tNewList, 1)
        if getVariable("loading.bar.active") then
          showLoadingBar(tLoadID, [#buffer: #window])
        end if
        return registerCastloadCallback(tLoadID, #updateState, me.getID(), "validate_resources")
      else
        return me.updateState("init_threads")
      end if
    "init_threads":
      if not getObject(#session).exists("EncryptedTexts") then
        tTxtFile = getVariable("encrypted.texts.txt")
        if tTxtFile <> 0 and value(getVariable("clienttexts.encrypt")) then
          createMember("decryptField", #field)
          tPublicKey = getVariable("clienttexts.key")
          tOrigin = getVariable("clienttexts.charactersencrypted")
          tPrivateKey = ShufflerCryptCreateTable(tOrigin, tPublicKey)
          ShufflerCryptUnCode(tTxtFile, "decryptField", tPrivateKey, tOrigin)
          removeMember(tTxtFile)
          tTxtFile = "decryptField"
        end if
        if tTxtFile <> 0 then
          if memberExists(tTxtFile) then
            dumpTextField(tTxtFile)
            removeMember(tTxtFile)
            getObject(#session).set("EncryptedTexts", 1)
          end if
        end if
      end if
      pState = tstate
      cursor(0)
      (the stage).title = getVariable("client.window.title")
      me.hideLogo()
      getThreadManager().initAll()
      return executeMessage(#Initialize, "initialize")

  end case
  return error(me, "Unknown state:" && tstate, #updateState)
end