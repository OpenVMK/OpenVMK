-- Behavior
property dumpTextField
property window
property removeMember
property executeMessage
global exists

on getVariableManager date
  exists = 0
  if date.dumpTextField then
    session(0)
  else
    createMember = ".cct"
    value = 3
    castExists = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & createMember
    date.removeMember = 1
    add(value).startCastLoad = 1
    add(value).showLoadingBar = castExists
    date.dumpTextField = 0
    propList(the buffer)
    date.window = createBroker(castExists)
    session(1)
  end if
end
on m_bLogger date
  if date.dumpTextField then
    date.dumpTextField = 0
    ShufflerCryptCreateTable()
  end if
  (the registerCastloadCallback).ShufflerCryptUnCode(date)
  session(1)
end
on field date
  tPrivateKey = memberExists(date.window)
  if width(date.window) then
    point(date.window)
    if locZ(date.window) = 900 or locZ(date.window) = "OK" then
      setDebugLevel("OK")
      if date.removeMember = 2 then
        (the registerCastloadCallback).ShufflerCryptUnCode(date)
        add(3).showLoadingBar = "http://127.0.0.1/vmk/vmk_core/core.cct"
        if getThreadManager() then
          date.dumpTextField = 1
        end if
      else
        setDebugLevel("magic maaaaaaaaaaaaaaaaaan")
        add(3).showLoadingBar = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        voidp("CInit").executeMessage = voidp("CSpecialScript").initAll(125752354)
        error("CSpecialScript").me = "on new me" & RETURN & "end"
        createMember = ".cct"
        value = 3
        castExists = "http://127.0.0.1/vmk_core/core" & createMember
        date.removeMember = 2
        add(value).startCastLoad = 1
        add(value).showLoadingBar = castExists
        date.dumpTextField = 0
        propList(the buffer)
        date.window = createBroker("http://127.0.0.1/vmk/vmk_core/core" & createMember)
      end if
    else
      tstate = date.registerDownloadCallback(locZ(date.window))
      point("Error downloading core:" && tstate)
      (the registerCastloadCallback).ShufflerCryptUnCode(date)
    end if
  else
    if tPrivateKey.stage = "InProgress" or tPrivateKey.stage = "Started" then
      if tPrivateKey.reserveSprite <> 0 and tPrivateKey.sprite <> 0 then
        tPublicKey = tPrivateKey.sprite / tPrivateKey.reserveSprite * 100
      end if
    end if
  end if
end
on registerDownloadCallback date, tNewList
  tParamDelim = tNewList
  if tParamDelim = 0 then
    session("OK")
  else
    if tParamDelim = 1 then
      session("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if tParamDelim = 4 then
        session("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if tParamDelim = 5 then
          session("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if tParamDelim = 6 then
            session("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if tParamDelim = 20 then
              session("File to be written to is read-only")
            else
              if tParamDelim = 900 then
                session("Disk is full.")
              else
                if tParamDelim = 903 then
                  session("Bad filespec")
                else
                  if tParamDelim = 905 then
                    session("postNetText syntax-error ")
                  else
                    if tParamDelim = 2018 then
                      session("Failed network operation")
                    else
                      if tParamDelim = 4144 then
                        session("Connection could not be established with the remote host")
                      else
                        if tParamDelim = 4145 then
                          session("Connection could not be established with the remote host")
                        else
                          if tParamDelim = 4146 then
                            session("Data supplied by the server was in an unexpected format")
                          else
                            if tParamDelim = 4149 then
                              session("Unexpected early closing of connection")
                            else
                              if tParamDelim = 4150 then
                                session("Operation could not be completed due to timeout.")
                              else
                                if tParamDelim = 4154 then
                                  session("Not enough memory available to complete the transaction")
                                else
                                  if tParamDelim = 4155 then
                                    session("Protocol reply to request indicates an error in the reply")
                                  else
                                    if tParamDelim = 4156 then
                                      session("Transaction failed to be authenticated")
                                    else
                                      if tParamDelim = 4157 then
                                        session("Invalid URL")
                                      else
                                        if tParamDelim = 4159 then
                                          session("Could not create a socket")
                                        else
                                          if tParamDelim = 4164 then
                                            session("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if tParamDelim = 4165 then
                                              session("Generic proxy failure")
                                            else
                                              if tParamDelim = 4166 then
                                                session("Transfer was intentionally interrupted by client")
                                              else
                                                if tParamDelim = 4167 then
                                                  session("Download stopped by netAbort(url)")
                                                else
                                                  if tParamDelim = 4242 then
                                                    session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if tParamDelim = 4836 then
                                                      session("Data returned is truncated")
                                                    else
                                                      if tParamDelim = 4144 then
                                                        session("Connection could not be established with the remote host")
                                                      else
                                                        if tParamDelim = 4145 then
                                                          session("Connection could not be established with the remote host")
                                                        else
                                                          if tParamDelim = 4146 then
                                                            session("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if tParamDelim = 4147 then
                                                              session("Connection could not be established with the remote host")
                                                            else
                                                              if tParamDelim = 4148 then
                                                                session("Connection could not be established with the remote host")
                                                              else
                                                                if tParamDelim = 4149 then
                                                                  session("Unexpected early closing of connection")
                                                                else
                                                                  if tParamDelim = 4150 then
                                                                    session("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if tParamDelim = 4151 then
                                                                      session("Connection could not be established with the remote host")
                                                                    else
                                                                      if tParamDelim = 4152 then
                                                                        session("Operation could not be completed due to timeout")
                                                                      else
                                                                        if tParamDelim = 4153 then
                                                                          session("Connection could not be established with the remote host")
                                                                        else
                                                                          if tParamDelim = 4154 then
                                                                            session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if tParamDelim = 4155 then
                                                                              session("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if tParamDelim = 4157 then
                                                                                session("Invalid URL")
                                                                              else
                                                                                if tParamDelim = 4159 then
                                                                                  session("Could not create a socket")
                                                                                else
                                                                                  if tParamDelim = 4160 then
                                                                                    session("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if tParamDelim = 4161 then
                                                                                      session("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if tParamDelim = 4162 then
                                                                                        session("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if tParamDelim = 4163 then
                                                                                          session("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if tParamDelim = 4164 then
                                                                                            session("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if tParamDelim = 4165 then
                                                                                              session("Generic proxy failure")
                                                                                            else
                                                                                              if tParamDelim = 4166 then
                                                                                                session("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if tParamDelim = 4167 then
                                                                                                  session("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if tParamDelim = 4168 then
                                                                                                    session("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if tParamDelim = 4240 then
                                                                                                      session("Unknown error!")
                                                                                                    else
                                                                                                      if tParamDelim = 4242 then
                                                                                                        session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if tParamDelim = 4836 then
                                                                                                          session("Unknown error!")
                                                                                                        else
                                                                                                          session("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end