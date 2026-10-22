-- Script
property m_visible
property m_pTakenActions
property m_pTutorialsData
property m_bTutorialsAllowed
property m_bMusic
property m_bFx
property m_bUi
property m_iVolume
property m_bTutorial
property m_bSettingsDataArrived
property m_iNavCode

on construct me
  m_iNavCode = VOID
  m_bSettingsDataArrived = 0
  m_visible = 0
  m_bTutorialsAllowed = 1
  m_pTakenActions = []
  m_pTutorialsData = VOID
  registerMessage(#Initialize, me.getID(), #InitializeObject)
  registerMessage(#ui_tutorial, me.getID(), #showHide)
  registerMessage(#get_tutorials_state, me.getID(), #getTutorialsVisibleState)
  registerMessage(#set_tutorials_state, me.getID(), #setTutorialsVisibleState)
end
on deconstruct me
  unregisterMessage(#ui_tutorial, me.getID())
  unregisterMessage(#get_tutorials_state, me.getID())
  unregisterMessage(#set_tutorials_state, me.getID())
  if not voidp(m_pTutorialsData) then
    removeObject(m_pTutorialsData.getID())
  end if
  m_pTutorialsData = VOID
  m_iNavCode = VOID
end
on InitializeObject me
  if m_bSettingsDataArrived then
    m_pTutorialsData = createObject("Tutorials Data", "CTutorialsData")
  end if
end
on showHide me
  if m_visible then
    me.getInterface().hide()
  else
    me.getInterface().show()
  end if
  m_visible = not m_visible
end
on takeAction me, t_ID
  t_bOK = 0
  tMessenger = getThread("Messenger")
  if tMessenger <> 0 then
    if tMessenger.getComponent().getMessengerState() = #normal then
      t_bOK = 1
    end if
  end if
  if not t_bOK then
    exit
  end if
  t_bAllowTutorials = me.getTutorialsVisibleState()
  if t_bAllowTutorials and not voidp(m_pTutorialsData) then
    t_desc = [#name: EMPTY, #description: EMPTY, #Caption: EMPTY, #link: EMPTY]
    if m_pTutorialsData.getTutorialByID(t_ID, t_desc) then
      t_txt = t_desc.description
      t_title = t_desc.Caption
      t = createTutorialWindow(me.getID(), t_desc.name, 3, 1)
      if t_desc.link.length = 0 then
        t.setText(t_txt, t_title, 0)
      else
        t.setText(t_txt, t_title, 1, t_desc.link)
      end if
      createTimeout(getUniqueID(), 500 + random(500), #openTutorialDialogWindow, me.getID(), t, 1)
      m_pTakenActions.append(t_ID)
    else
      put "Tutorials not ready"
    end if
  end if
end
on actionTaken me, t_ID
  if m_pTakenActions.getOne(t_ID) > 0 then
    return 1
  else
    return 0
  end if
end
on openTutorialDialogWindow me, t_mp_DialogWindow
  if objectp(t_mp_DialogWindow) then
    if t_mp_DialogWindow.handlers().getOne(#show) <> 0 then
      t_mp_DialogWindow.show()
    else
      put "Could not open Tutorial Dialog"
    end if
  end if
end
on tutorialWindowEvent me, t_dialogName, t_dialogEvent, t_dialogParam
  t_bAllowTutorials = me.getTutorialsVisibleState()
  case t_dialogEvent of
    #tutorialOFF:
      if t_bAllowTutorials then
        me.setTutorialsVisibleState(0)
      else
        me.setTutorialsVisibleState(1)
      end if
    #tutorialMore:
      executeMessage(#open_help_page, t_dialogParam)
    #tutorialOK:
      if not t_bAllowTutorials then
      end if
    #link1:
      m_iNavCode = 11
      getThread("navigator").getComponent().RequestNavigationNodes(#adventureland)
    #link2:
      m_iNavCode = 1100
      getThread("navigator").getComponent().RequestNavigationNodes(#fantasyland)
    #link3:
      m_iNavCode = 1001
      getThread("navigator").getComponent().RequestNavigationNodes(#adventureland)
    #link4:
      m_iNavCode = 1104
      getThread("navigator").getComponent().RequestNavigationNodes(#frontierland)
    otherwise:
      put ["Unknown Tutorial Dialog", t_dialogName, t_dialogEvent, t_dialogParam]

  end case
end
on shortcutnavigate me
  if integerp(m_iNavCode) then
    getThread("navigator").getComponent().NavigateToRoom(m_iNavCode)
    m_iNavCode = VOID
  end if
end
on getTutorialsVisibleState me, t_list
  return m_bTutorialsAllowed
  if voidp(t_list) then
    t_list = []
  end if
  t_list.deleteAll()
  t_bAllowTutorials = 1
  t_sPlayerName = getObject(#session).get("name")
  t_ar_config = me._getTutorialConfiguration()
  tPos = t_ar_config.findPos(t_sPlayerName)
  if tPos <> 0 then
    tvalue = value(t_ar_config[t_sPlayerName])
    if tvalue = 0 then
      t_bAllowTutorials = 0
    end if
  end if
  t_list.append(t_bAllowTutorials)
  return t_bAllowTutorials
end
on setTutorialsVisibleState me, t_bState
  m_bTutorialsAllowed = t_bState
  t_bFx = getObject(#session).get("fx")
  t_bMusic = getObject(#session).get("music")
  t_bUi = getObject(#session).get("ui")
  t_bVol = getObject(#session).get("volume")
  t_bTut = getObject(#session).get("tutorial")
  t_bTrade = getObject(#session).get("traderequests")
  if t_bTut <> m_bTutorialsAllowed then
    getObject(#session).set("tutorial", m_bTutorialsAllowed)
    t_mp_dataToServer = [#int: t_bFx, #int: t_bMusic, #int: t_bUi, #int: t_bVol, #int: m_bTutorialsAllowed, #int: t_bTrade]
    getConnection(getVariable("main.connection.id", "VMK")).send("SetSoundPrefs", t_mp_dataToServer)
  end if
  if not m_bSettingsDataArrived then
    m_bSettingsDataArrived = 1
    me.InitializeObject()
  end if
end
on _getTutorialConfiguration me
  t_ar_config = [:]
  t_sPref = getPref("vmk_tut")
  t_bAllowTutorials = 1
  if stringp(t_sPref) then
    t_ar_config = value(t_sPref)
  end if
  return t_ar_config
end
on createProperties me, i_sText
  t_props = [:]
  t_deli = the itemDelimiter
  the itemDelimiter = RETURN
  repeat with i = 1 to i_sText.item.count
    t_item = i_sText.item[i]
    if t_item.char.count <> 0 then
      if not (t_item.char[1..2] = "--") then
        t = offset("=", t_item)
        if t <> 0 then
          t_prop = symbol(t_item.char[1..t - 1])
          if t_props.findPos(t_prop) = 0 then
            t_val = value(t_item.char[t + 1..t_item.char.count])
            t_props.setaProp(t_prop, t_val)
          end if
        end if
      end if
    end if
  end repeat
  the itemDelimiter = t_deli
  return t_props
end
on _ChangeSettings this
end