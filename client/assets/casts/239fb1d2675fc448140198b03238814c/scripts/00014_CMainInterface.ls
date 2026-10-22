-- Script
on construct this
  registerMessage(#login_hide, this.getID(), #closeLoginWindow)
  registerMessage(#dictionary_ready, this.getID(), #ShowLogin)
  registerMessage(#ConnectionFailed, this.getID(), #ShowConnectionFailed)
  return 1
end
on deconstruct this
  unregisterMessage(#login_hide, this.getID())
  unregisterMessage(#dictionary_ready, this.getID())
  unregisterMessage(#ConnectionFailed, this.getID())
  return 1
end
on ShowLogin this
  if the runMode = "Author" or the runMode = "Projector" then
    createObject("login", "CLoginWindow")
  end if
end
on closeLoginWindow me
  removeObject("login")
  if getVariableValue("interface.showspritelimit") then
    ShowSpriteLimitCounter()
  end if
end
on ShowConnectionFailed me
  t = createDialogWindow(me.getID() & the milliSeconds, "ConnectionFailed", 1, 1)
  t.show()
  t.setText("Can not connect to the VMK server. Check your firewall/internet security settings.", "Connection Failed", "OK")
end