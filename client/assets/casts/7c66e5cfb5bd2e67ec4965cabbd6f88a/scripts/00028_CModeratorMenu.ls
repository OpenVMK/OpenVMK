-- Script
property m_sWindowID
property m_rWnd
property m_arBanTimes
property m_ObjUserToOperate
property m_sName
property m_ar_PermList

on construct this
  m_sWindowID = "Moderator_Menu"
  m_rWnd = VOID
  m_ObjUserToOperate = VOID
  m_sName = EMPTY
  m_ar_PermList = VOID
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      receiveUpdate(this.getID())
    end if
  end if
  return 1
end
on deconstruct this
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      removeUpdate(this.getID())
    end if
  end if
  return 1
end
on update this
  if keyPressed(BACKSPACE) then
    if (the environment).productVersion = "10.2" then
      if (the environment).productBuildVersion = "21" then
        t_rWindow = getWindow(m_sWindowID)
        if objectp(t_rWindow) then
          t_rElement = t_rWindow.getElement("mods.target.input")
          if objectp(t_rElement) then
            if the keyboardFocusSprite = t_rElement.getProperty(#sprite).spriteNum then
              t_sText = t_rElement.getProperty(#sprite).member.text
              delete char -30000 of t_sText
              t_rElement.getProperty(#sprite).member.text = t_sText
            end if
          end if
        end if
      end if
    end if
  end if
end
on OpenCloseMenuWindow this
  if createWindow(m_sWindowID, "vmk_mods_menu.window") then
    m_rWnd = getWindow(m_sWindowID)
    m_rWnd.center()
    m_rWnd.registerClient(this.getID())
    m_rWnd.registerProcedure(#_EventProcModMenu, this.getID(), #mouseDown)
    m_rWnd.registerProcedure(#_EventProcModMenu, this.getID(), #keyDown)
    t_sHdTxt = getText("mods.menu.hd")
    m_rWnd.getElement("mods.window.title").setText(t_sHdTxt)
    this._CheckPermissions()
  else
    removeWindow(m_sWindowID)
    createWindow(m_sWindowID, "vmk_mods_menu.window")
    m_rWnd = getWindow(m_sWindowID)
    m_rWnd.center()
    m_rWnd.registerClient(this.getID())
    m_rWnd.registerProcedure(#_EventProcModMenu, this.getID(), #mouseDown)
    m_rWnd.registerProcedure(#_EventProcModMenu, this.getID(), #keyDown)
    t_sHdTxt = getText("mods.menu.hd")
    m_rWnd.getElement("mods.window.title").setText(t_sHdTxt)
    this._CheckPermissions()
    return 0
  end if
end
on SelectWholeRoom this
  t_sTxt = getText("mods.room")
  if objectp(m_rWnd) then
    if m_rWnd.elementExists("mods.akb.target") then
      m_rWnd.getElement("mods.akb.target").setText(t_sTxt)
    end if
  end if
  m_ObjUserToOperate = VOID
  m_sName = EMPTY
end
on SelectUser this, a_ObjAvatar
  if objectp(a_ObjAvatar) then
    m_sName = a_ObjAvatar.GetParam("NAME")
    if objectp(m_rWnd) then
      if m_rWnd.elementExists("mods.target.input") then
        m_rWnd.getElement("mods.target.input").setText(m_sName)
      end if
    end if
    m_ObjUserToOperate = a_ObjAvatar
  else
    m_ObjUserToOperate = VOID
  end if
end
on SetName this, a_sName
  if stringp(a_sName) then
    m_sName = a_sName
    m_ObjUserToOperate = VOID
  else
    if a_sName = EMPTY then
      m_sName = a_sName
      m_ObjUserToOperate = VOID
    end if
  end if
end
on SetPermissions this, a_ar_PermList
  if listp(a_ar_PermList) then
    m_ar_PermList = a_ar_PermList
  end if
end
on _CheckPermissions this
  if objectp(m_rWnd) then
    if listp(m_ar_PermList) then
      if m_ar_PermList.findPos("mute") > 0 then
        if m_rWnd.elementExists("mods.mute.single") then
          m_rWnd.getElement("mods.mute.single").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.mute.single") then
          m_rWnd.getElement("mods.mute.single").deactivate()
        end if
      end if
      if m_ar_PermList.findPos("roommute") > 0 then
        if m_rWnd.elementExists("mods.mute") then
          m_rWnd.getElement("mods.mute").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.mute") then
          m_rWnd.getElement("mods.mute").deactivate()
        end if
      end if
      if m_ar_PermList.findPos("forcenamechange") > 0 then
        if m_rWnd.elementExists("mods.forcename") then
          m_rWnd.getElement("mods.forcename").Activate()
        end if
      else
        if m_rWnd.elementExists("mods.forcename") then
          m_rWnd.getElement("mods.forcename").deactivate()
        end if
      end if
    end if
  end if
end
on _Remove this
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
    removeUpdate(this.getID())
  end if
end
on _MuteSingle this
  if m_sName <> EMPTY then
    getConnection(getVariable("main.connection.id", "VMK")).send("MuteUser", [#string: m_sName])
  end if
end
on _UnmuteSingle this
  if m_sName <> EMPTY then
    getConnection(getVariable("main.connection.id", "VMK")).send("UnmuteUser", [#string: m_sName])
  end if
end
on _MuteRoom this
  getConnection(getVariable("main.connection.id", "VMK")).send("MuteRoom")
end
on _UnmuteRoom this
  getConnection(getVariable("main.connection.id", "VMK")).send("UnmuteRoom")
end
on _OpenPlayerInfoTool this
  if objectp(m_ObjUserToOperate) then
    m_sName = m_ObjUserToOperate.GetParam("NAME")
  else
    m_sName = m_rWnd.getElement("mods.target.input").getText()
  end if
  if m_sName <> EMPTY then
    if the platform contains "macintosh" then
      t_mp_EncodeList = [32: "20", 33: "21", 34: "22", 35: "23", 36: "24", 37: "25", 38: "26", 39: "27", 40: "28", 41: "29", 42: "2A", 43: "2B", 44: "2C", 45: "2D", 46: "2E", 47: "2F", 48: "30", 49: "31", 50: "32", 51: "33", 52: "34", 53: "35", 54: "36", 55: "37", 56: "38", 57: "39", 58: "3A", 59: "3B", 60: "3C", 61: "3D", 62: "3E", 63: "3F", 64: "40", 91: "5B", 92: "5C", 93: "5D", 94: "5E", 95: "5F", 96: "60", 123: "7B", 124: "7C", 125: "7D", 126: "7E", 127: "7F", 165: "80", 170: "81", 173: "82", 176: "83", 179: "84", 183: "85", 186: "86", 189: "87", 195: "88", 197: "89", 201: "8A", 209: "8B", 212: "8C", 217: "8D", 218: "8E", 182: "8F", 198: "90", 206: "91", 226: "92", 227: "93", 228: "94", 240: "95", 246: "96", 247: "97", 249: "98", 250: "99", 251: "9A", 253: "9B", 254: "9C", 255: "9D", 245: "9E", 196: "9F", 202: "A0", 193: "A1", 162: "A2", 163: "A3", 219: "A4", 180: "A5", 207: "A6", 164: "A7", 172: "A8", 169: "A9", 187: "AA", 199: "AB", 194: "AC", 208: "AD", 168: "AE", 248: "AF", 161: "B0", 177: "B1", 211: "B2", 210: "B3", 171: "B4", 181: "B5", 166: "B6", 225: "B7", 252: "B8", 213: "B9", 188: "BA", 200: "BB", 185: "BC", 184: "BD", 178: "BE", 192: "BF", 203: "C0", 231: "C1", 229: "C2", 204: "C3", 128: "C4", 129: "C5", 174: "C6", 130: "C7", 233: "C8", 131: "C9", 230: "CA", 232: "CB", 237: "CC", 234: "CD", 235: "CE", 236: "CF", 220: "D0", 132: "D1", 241: "D2", 238: "D3", 239: "D4", 205: "D5", 133: "D6", 215: "D7", 175: "D8", 244: "D9", 242: "DA", 243: "DB", 134: "DC", 160: "DD", 222: "DE", 167: "DF", 136: "E0", 135: "E1", 137: "E2", 139: "E3", 138: "E4", 140: "E5", 190: "E6", 141: "E7", 143: "E8", 142: "E9", 144: "EA", 145: "EB", 147: "EC", 146: "ED", 148: "EE", 149: "EF", 221: "F0", 150: "F1", 152: "F2", 151: "F3", 153: "F4", 155: "F5", 154: "F6", 214: "F7", 191: "F8", 157: "F9", 156: "FA"]
      s2 = EMPTY
      repeat with i = 1 to length(m_sName)
        c = char i of m_sName
        if not voidp(t_mp_EncodeList.getaProp(charToNum(c))) then
          s2 = s2 & "%" & t_mp_EncodeList.getaProp(charToNum(c))
          next repeat
        end if
        s2 = s2 & c
      end repeat
    else
      s = urlEncode(m_sName)
      s2 = EMPTY
      repeat with i = 1 to s.length
        case char i of s of
          ",":
            s2 = s2 & "%2c"
          otherwise:
            s2 = s2 & char i of s

        end case
      end repeat
    end if
    t_sURL = getVariable("playerinfotool.url")
    t_sURL = t_sURL & "=" & s2
    if stringp(t_sURL) then
      gotoNetPage(t_sURL, "housekeeping")
    end if
  end if
end
on _ForceName this
  if m_sName <> EMPTY then
    getConnection(getVariable("main.connection.id", "VMK")).send("ForceNameChange", [#string: m_sName])
  end if
end
on _OpenBrowser this
  t_sURL = getVariable("callforhelpbrowser.url")
  if stringp(t_sURL) then
    gotoNetPage(t_sURL, "_blank")
  end if
end
on _OpenAKBforRooms this
  m_ObjUserToOperate = VOID
  m_sName = EMPTY
  getThread(#moderator_tools).getInterface().SelectWholeRoom()
  getThread(#moderator_tools).getInterface().ManageModWindows("akb")
end
on _OpenAKBforUser this
  if objectp(m_ObjUserToOperate) then
    m_sName = m_ObjUserToOperate.GetParam("NAME")
  else
    m_sName = m_rWnd.getElement("mods.target.input").getText()
  end if
  if m_sName <> EMPTY then
    getThread(#moderator_tools).getInterface().SetAvatarName(m_sName)
    getThread(#moderator_tools).getInterface().ManageModWindows("akb")
  end if
end
on _SelectRoomOwner this
  t_rName = []
  executeMessage(#roomOwner, t_rName)
  t_sName = t_rName[1]
  if t_sName <> EMPTY and t_sName <> VOID then
    t_rAvatar = getThread(#room).component._AccessRoom().Search("NAME", t_sName)
    if objectp(t_rAvatar) then
      t_rAvatar.GetFactor().select()
    end if
  end if
end
on _EventProcModMenu this, tEvent, tElemID, tParam
  if tEvent = #mouseDown then
    case tElemID of
      "mods.mute.single":
        this._MuteSingle()
      "mods.unmute.single":
        this._UnmuteSingle()
      "mods.mute":
        this._MuteRoom()
      "mods.unmute":
        this._UnmuteRoom()
      "mods.forcename":
        this._ForceName()
      "mods.akb":
        this._OpenAKBforUser()
      "mods.akbrooms":
        this._OpenAKBforRooms()
      "mods.pit":
        this._OpenPlayerInfoTool()
      "mods.helpbrowser":
        this._OpenBrowser()
      "mods.roomsowner":
        this._SelectRoomOwner()
      "button.pull":
        PullLoadingScreenConfiguration()
      "close":
        this._Remove()

    end case
  else
    if tEvent = #keyDown and tElemID = "mods.target.input" then
      m_ObjUserToOperate = VOID
      if _key.keyCode <> 51 and _key.keyCode <> 49 and _key.keyCode <> 51 then
        t_sName = m_rWnd.getElement("mods.target.input").getText()
        m_sName = t_sName
      end if
      if m_rWnd.getElement("mods.target.input").getText() = EMPTY then
        m_sName = EMPTY
      end if
    end if
  end if
end