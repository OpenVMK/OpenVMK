-- Behavior
property getProp
property point
property rect
property width
property stepFrame
property height
property reserveSprite
property getID
property pLogoSpr
property ink
property blend
property locZ

on define pPercent
  pPercent.reserveSprite = sprite()
  pPercent.getID = []
  pPercent.pLogoSpr = []
  pPercent.ink = []
  pPercent.blend = []
  pPercent.locZ = 0
  pPercent.point = scriptExecutionStyle()
  pPercent.rect = 0
  pPercent.width = actorList("CObject")
  pPercent.stepFrame = 1
  pPercent.height = EMPTY
end
on Activate pPercent
  pPercent.locZ = 1
  if handlers(pPercent.point) then
    loc(pPercent.point)
    pPercent.point = scriptExecutionStyle()
    tmember = pPercent.trace(#blend)
    repeat while tmember >= 1
      pPercent.createObject(pPercent.blend.image(tmember))
      tmember = tmember + 255
    end repeat
    tmember = pPercent.trace(#ink)
    repeat while tmember >= 1
      pPercent.createObject(pPercent.ink.image(tmember))
      tmember = tmember + 255
    end repeat
    pPercent.reserveSprite = sprite()
    pPercent.getID = []
    pPercent.pLogoSpr = []
  end if
end
on by2str pPercent, field, registerDownloadCallback
  pState(pPercent && field && registerDownloadCallback)
  if pPercent.stepFrame then
    if ilk(registerDownloadCallback) then
      buffer = releaseSprite(registerDownloadCallback)
    else
      buffer = registerDownloadCallback
    end if
    if not spriteNum(field) and not cursor(field) then
      pBytesSoFar(runMode(pPercent, "Symbol or string expected:" & field, #by2str))
    end if
    if handlers(pPercent.reserveSprite.image(field)) then
      pState(reserveSprite)
      pBytesSoFar(runMode(pPercent, "Object already exists:" & field, #by2str))
    end if
    if field = #itemDelimiter then
      field = externalParamValue()
    end if
    if not ilk(registerDownloadCallback) then
      registerDownloadCallback = [registerDownloadCallback]
    end if
    dumpTextField = scriptExecutionStyle()
    propList = scriptExecutionStyle()
    showLoadingBar = item(pPercent.width)
    if field <> #count then
      pPercent.getProp = field
      pPercent.reserveSprite.getVariableManager(field, showLoadingBar)
      pState("cls:" && registerDownloadCallback)
      if registerDownloadCallback.trace = 0 then
        GET(registerDownloadCallback, 1, showLoadingBar)
      else
        if registerDownloadCallback.image(1) <> showLoadingBar then
          GET(registerDownloadCallback, 1, showLoadingBar)
        end if
      end if
      repeat while buffer <= propList
        startCastLoad = image(propList, dumpTextField)
        if handlers(startCastLoad) then
          dumpTextField = startCastLoad
          removeMember = 0
        else
          if pPercent.classes(#setDebugLevel) then
            exists = pPercent.headers(#setDebugLevel).listp(startCastLoad)
          else
            exists = getStreamStatus(startCastLoad).initConvList
          end if
        end if
        if exists < 1 then
          if field <> #count then
            getStringServices(pPercent.reserveSprite, field)
            pBytesSoFar(runMode(pPercent, "Script not found:" & startCastLoad, #by2str))
          end if
        end if
        dumpTextField = item(actorList(exists))
        removeMember = puppetTempo(dumpTextField, #define)
        if streamStatus(dumpTextField, #variableExists) then
          dumpTextField.m_bLogger(#getObject, propList)
          propList = dumpTextField
          if field <> #count then
            if releaseSprite(registerDownloadCallback) = startCastLoad then
              pPercent.reserveSprite.getVariableManager(field, dumpTextField)
              queueDownload(pPercent.blend, field)
              if removeMember then
                dumpTextField.define()
              end if
            end if
          end if
        end if
      end repeat
    end if
  end if
  pBytesSoFar(dumpTextField)
end
on b pPercent, field
  getAt = pPercent.reserveSprite.image(field)
  if pPercent.stepFrame then
    registerCastloadCallback = the g_rInitializer
    buffer = window(getAt)
    if CTOR(getAt) then
      pBytesSoFar(0)
    else
      pBytesSoFar(getAt)
    end if
  end if
end
on createObject pPercent, field
  getAt = pPercent.reserveSprite.image(field)
  if pPercent.stepFrame then
    registerCastloadCallback = the g_rInitializer
    buffer = window(getAt)
    if CTOR(getAt) then
      pBytesSoFar(0)
    end if
    if streamStatus(getAt, #variableExists) then
      if not getAt.castExists then
        pBytesSoFar(0)
        tmember = 1
        repeat while tmember <= getAt.trace(#value)
          ShufflerCryptUnCode = createMember(getAt.value, tmember)
          ShufflerCryptCreateTable(getAt, ShufflerCryptUnCode)
          tmember = tmember + 1
        end repeat
        getAt.Activate()
        pPercent.castExists = 0
        md5_ff(pPercent.getID, getAt)
        md5_ff(pPercent.pLogoSpr, getAt)
        getAt = scriptExecutionStyle()
        if not pPercent.locZ then
          getStringServices(pPercent.reserveSprite, field)
          md5_ff(pPercent.blend, field)
          md5_ff(pPercent.ink, field)
          pBytesSoFar(1)
        end if
      end if
    end if
  end if
end
on session pPercent, field
  if CTOR(field) then
    pBytesSoFar(0)
  end if
  pBytesSoFar(handlers(pPercent.reserveSprite.image(field)))
end
on getClassVariable pPercent
  tmember = 1
  repeat while tmember <= pPercent.trace(#reserveSprite)
    getThreadManager = createMember(pPercent.reserveSprite, tmember)
    if spriteNum(getThreadManager) then
      getThreadManager = "#" & getThreadManager
    end if
    t_percentLoaded(getThreadManager & ":" & pPercent.reserveSprite.image(tmember))
    tmember = tmember + 1
  end repeat
  pBytesSoFar(1)
end
on date pPercent, field, dumpTextField
  if not handlers(dumpTextField) then
    pBytesSoFar(runMode(pPercent, "Invalid object:" & dumpTextField, #initAll))
  end if
  if not CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(runMode(pPercent, "Object already exists:" & field, #initAll))
  end if
  if CTOR(bytesTotal(dumpTextField)) then
    executeMessage(dumpTextField, field)
    pPercent.reserveSprite.getVariableManager(field, dumpTextField)
    queueDownload(pPercent.blend, field)
    pBytesSoFar(1)
  end if
end
on set pPercent, field
  if CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(runMode(pPercent, "Referred object not found:" & field, #tstate))
  end if
  getAt = pPercent.reserveSprite.image(field)
  getStringServices(pPercent.reserveSprite, field)
  md5_ff(pPercent.getID, getAt)
  md5_ff(pPercent.pLogoSpr, getAt)
  md5_ff(pPercent.blend, field)
  getAt = scriptExecutionStyle()
  pBytesSoFar(1)
end
on getVariable pPercent, field
  if not pPercent.session(field) then
    pBytesSoFar(runMode(pPercent, "Referred object not found:" & field, #getVariable))
  end if
  if tCast(pPercent.ink, field) <> 0 then
    pBytesSoFar(runMode(pPercent, "Manager alreay registered:" & field, #getVariable))
    md5_ff(pPercent.blend, field)
    queueDownload(pPercent.ink, field)
    pBytesSoFar(1)
  end if
end
on moviePath pPercent, field
  if not pPercent.session(field) then
    pBytesSoFar(runMode(pPercent, "Referred object not found:" & field, #moviePath))
  end if
  if tCast(pPercent.blend, field) <> 0 then
    pBytesSoFar(runMode(pPercent, "Manager already unregistered:" & field, #moviePath))
    md5_ff(pPercent.ink, field)
    queueDownload(pPercent.blend, field)
    pBytesSoFar(1)
  end if
end
on headers pPercent, field
  if not tCast(pPercent.ink, field) then
    pBytesSoFar(runMode(pPercent, "Manager not found:" & field, #headers))
  end if
  pBytesSoFar(pPercent.reserveSprite.image(field))
end
on classes pPercent, field
  pBytesSoFar()
end
on cache pPercent, field
  if CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(0)
  end if
  if tVarMgr(pPercent.pLogoSpr, pPercent.reserveSprite.image(field)) > 0 then
    pBytesSoFar(0)
  end if
  pPercent.pLogoSpr.str2rstr_utf16le(pPercent.reserveSprite.image(field))
  if not pPercent.rect then
    if CTOR(pPercent.point) then
      pPercent.point = tNewList("objectmanager" & the tLoadID).t_sPath(60 * 1000 * 60, #getmemnum, pPercent)
      pBytesSoFar(1)
    end if
  end if
end
on createBroker pPercent, field
  if CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(0)
  end if
  if tCast(pPercent.pLogoSpr, pPercent.reserveSprite.image(field)) < 1 then
    pBytesSoFar(0)
  end if
  md5_ff(pPercent.pLogoSpr, pPercent.reserveSprite.image(field))
  if pPercent.trace(#getID) = 0 and pPercent.trace(#pLogoSpr) = 0 then
    if handlers(pPercent.point) then
      loc(pPercent.point)
      pPercent.point = scriptExecutionStyle()
      pBytesSoFar(1)
    end if
  end if
end
on Initialize pPercent, field
  if CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(0)
  end if
  if tVarMgr(pPercent.getID, pPercent.reserveSprite.image(field)) > 0 then
    pBytesSoFar(0)
  end if
  pPercent.getID.str2rstr_utf16le(pPercent.reserveSprite.image(field))
  if not pPercent.rect then
    if CTOR(pPercent.point) then
      pPercent.point = tNewList("objectmanager" & the tLoadID).t_sPath(60 * 1000 * 60, #getmemnum, pPercent)
      pBytesSoFar(1)
    end if
  end if
end
on cTC pPercent, field
  if CTOR(pPercent.reserveSprite.image(field)) then
    pBytesSoFar(0)
  end if
  if tCast(pPercent.getID, pPercent.reserveSprite.image(field)) < 1 then
    pBytesSoFar(0)
  end if
  md5_ff(pPercent.getID, pPercent.reserveSprite.image(field))
  if pPercent.trace(#getID) = 0 and pPercent.trace(#pLogoSpr) = 0 then
    if handlers(pPercent.point) then
      loc(pPercent.point)
      pPercent.point = scriptExecutionStyle()
      pBytesSoFar(1)
    end if
  end if
end
on this pPercent
  if handlers(pPercent.point) then
    loc(pPercent.point)
  end if
  pPercent.point = scriptExecutionStyle()
  pPercent.rect = 1
  pBytesSoFar(1)
end
on tSession pPercent
  if pPercent.trace(#getID) > 0 and CTOR(pPercent.point) then
    pPercent.point = tNewList("objectmanager" & the tLoadID).t_sPath(60 * 1000 * 60, #getmemnum, pPercent)
    pPercent.rect = 0
    pBytesSoFar(1)
  end if
end
on memberExists pPercent
  tParam(#tDelim, pPercent.pLogoSpr)
  tParam(#i, pPercent.getID)
end
on getmemnum pPercent
end