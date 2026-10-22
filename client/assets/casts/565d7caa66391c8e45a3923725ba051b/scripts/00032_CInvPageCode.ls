-- Script
property m_rWindow

on construct this
  m_rWindow = VOID
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on close this
  t_ar_rFields = []
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input1"))
  if t_ar_rFields[1] <> 0 then
    t_ar_rFields[1].setEdit(0)
  end if
end
on open me
  t_ar_rFields = []
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input1"))
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input2"))
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input3"))
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input4"))
  repeat with t_field in t_ar_rFields
    if t_field <> 0 then
      t_field.setText(EMPTY)
    end if
  end repeat
  createTimeout(#setFocusTimeOut, 500, #setFocus, me.getID(), VOID, 1)
end
on setFocus me
  t_ar_rFields = []
  t_ar_rFields.add(m_rWindow.getElement("inv.codes.input1"))
  if t_ar_rFields[1] <> 0 then
    t_ar_rFields[1].setEdit(1)
  end if
  if getTimeout(#setFocusTimeOut) <> 0 then
    removeTimeout(#setFocusTimeOut)
  end if
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
  m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
  m_rWindow.merge("vmk_inv_codes.window")
  this._DimSendButton()
  this.close()
  return 1
end
on Purge this, a_rWindow
  a_rWindow.removeProcedure(#keyDown)
  a_rWindow.removeProcedure(#keyUp)
  m_rWindow = VOID
  return a_rWindow.unmerge()
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
end
on _DimSendButton this
  t_bValid = 1
  repeat with i = 1 to 4
    t_bValid = t_bValid and m_rWindow.getElement("inv.codes.input" & i).getText().length = 4
  end repeat
  m_rWindow.getElement("inv.entercode.button").setProperty(#blend, 50 + t_bValid * 50)
end
on _EventProc this, a_kEvent, a_sElem, a_vParam, a_sWndID
  if a_kEvent = #keyUp then
    tStart = the selStart
    if the key = BACKSPACE or the keyCode = 117 then
      t_ar_rFields = []
      t_ar_rFields.add(m_rWindow.getElement("inv.codes.input1"))
      t_ar_rFields.add(m_rWindow.getElement("inv.codes.input2"))
      t_ar_rFields.add(m_rWindow.getElement("inv.codes.input3"))
      t_ar_rFields.add(m_rWindow.getElement("inv.codes.input4"))
      t_iField = integer(the last char in a_sElem)
      t_rField = t_ar_rFields[t_iField]
      t_sText = t_rField.getText()
      t_iLength = t_sText.length
      if t_iLength = 0 then
        if t_iField = 1 then
          return 0
        else
          t_rField = t_ar_rFields[t_iField - 1]
          t_sText = t_rField.getText()
        end if
      end if
      if the key = BACKSPACE then
        delete (t_sText).char[tStart]
      else
        if the keyCode = 117 then
          delete (t_sText).char[tStart + 1]
        end if
      end if
      t_rField.setEdit(1)
      t_rField.setText(t_sText)
      this._DimSendButton()
      return 1
    end if
  else
    if a_kEvent = #keyDown then
      if the commandDown or the optionDown or the controlDown then
        if the key = "v" or the key = "V" then
          return 1
        end if
      end if
      if the key = BACKSPACE or the keyCode = 117 then
        return 1
      else
        if the keyCode = 123 or the keyCode = 124 then
          return 1
        else
          if the key = SPACE then
            stopEvent()
            return 1
          else
            tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789"
            tAscii = charToNum(the key)
            t_allow = 0
            if tAscii > 31 and tAscii < 128 then
              if tValidKeys contains the key or tValidKeys = EMPTY then
                t_allow = 1
              end if
            end if
            if not t_allow then
              stopEvent()
              return 1
            end if
            if m_rWindow.getElement(a_sElem).getText().length = 3 then
              t_sText = m_rWindow.getElement(a_sElem).getText()
              m_rWindow.getElement(a_sElem).setText(t_sText & the key)
              case a_sElem of
                "inv.codes.input1":
                  m_rWindow.getElement("inv.codes.input2").setEdit(1)
                "inv.codes.input2":
                  m_rWindow.getElement("inv.codes.input3").setEdit(1)
                "inv.codes.input3":
                  m_rWindow.getElement("inv.codes.input4").setEdit(1)

              end case
              this._DimSendButton()
              return 1
            else
              if m_rWindow.getElement(a_sElem).getText().length = 4 then
                case a_sElem of
                  "inv.codes.input1":
                    m_rWindow.getElement("inv.codes.input2").setEdit(1)
                    m_rWindow.getElement("inv.codes.input2").setText(the key)
                  "inv.codes.input2":
                    m_rWindow.getElement("inv.codes.input3").setEdit(1)
                    m_rWindow.getElement("inv.codes.input3").setText(the key)
                  "inv.codes.input3":
                    m_rWindow.getElement("inv.codes.input4").setEdit(1)
                    m_rWindow.getElement("inv.codes.input4").setText(the key)
                  "inv.codes.input4":
                    t_sText = m_rWindow.getElement("inv.codes.input4").getText()
                    stopEvent()
                    this._DimSendButton()
                    return 1

                end case
                this._DimSendButton()
                return 0
              end if
            end if
          end if
        end if
      end if
    else
      case a_sElem of
        "inv.entercode.button":
          t_sCode = EMPTY
          put m_rWindow.getElement("inv.codes.input1").getText() after t_sCode
          put m_rWindow.getElement("inv.codes.input2").getText() after t_sCode
          put m_rWindow.getElement("inv.codes.input3").getText() after t_sCode
          put m_rWindow.getElement("inv.codes.input4").getText() after t_sCode
          m_rWindow.getElement("inv.codes.input1").setText(EMPTY)
          m_rWindow.getElement("inv.codes.input2").setText(EMPTY)
          m_rWindow.getElement("inv.codes.input3").setText(EMPTY)
          m_rWindow.getElement("inv.codes.input4").setText(EMPTY)
          m_rWindow.getElement("inv.entercode.button").setProperty(#blend, 50)
          if connectionExists("VMK") then
            getConnection("VMK").send("CodeRedemption", [#str: t_sCode])
          end if
        "help":
          executeMessage("ui_help", "help.inventory.codes")

      end case
    end if
  end if
end