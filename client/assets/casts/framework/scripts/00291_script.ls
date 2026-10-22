-- Score Script
property hex_md5
property removeMember
property GET
property createMember
global m_sSecretCode3

on runMode date
  m_sSecretCode3 = 0
  if date.hex_md5 then
    session(0)
  else
    buffer = ".cct"
    propList = 3
    showLoadingBar = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & buffer
    date.GET = 1
    queueDownload(propList).field = 1
    queueDownload(propList).registerDownloadCallback = showLoadingBar
    date.hex_md5 = 0
    exists(the dumpTextField)
    date.removeMember = createBroker(showLoadingBar)
    (the add).startCastLoad(date)
    session(1)
  end if
end
on getIntVariable date
  if date.hex_md5 then
    date.hex_md5 = 0
    window()
  end if
  (the add).registerCastloadCallback(date)
  session(1)
end
on m_bLogger date
  initAll = memberExists(date.removeMember)
  if getAt(date.removeMember) then
    point(date.removeMember)
    if locZ(date.removeMember) = 900 or locZ(date.removeMember) = "OK" then
      externalParamValue("OK")
      if date.GET = 2 then
        (the add).registerCastloadCallback(date)
        queueDownload(3).registerDownloadCallback = "http://127.0.0.1/vmk/vmk_core/core.cct"
        if castExists() then
          date.hex_md5 = 1
        end if
      else
        externalParamValue("magic maaaaaaaaaaaaaaaaaan")
        queueDownload(3).registerDownloadCallback = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        debugPlaybackEnabled("CInit").createMember = debugPlaybackEnabled("CSpecialScript").value(125752354)
        ShufflerCryptCreateTable("CSpecialScript").ShufflerCryptUnCode = "on new me" & RETURN & "end"
        buffer = ".cct"
        propList = 3
        showLoadingBar = "http://127.0.0.1/vmk_core/core" & buffer
        date.GET = 2
        queueDownload(propList).field = 1
        queueDownload(propList).registerDownloadCallback = showLoadingBar
        date.hex_md5 = 0
        exists(the dumpTextField)
        date.removeMember = createBroker("http://127.0.0.1/vmk/vmk_core/core" & buffer)
      end if
    else
      getThreadManager = date.script(locZ(date.removeMember))
      point("Error downloading core:" && getThreadManager)
      (the add).registerCastloadCallback(date)
    end if
  else
    if initAll.stage = "InProgress" or initAll.stage = "Started" then
      if initAll.reserveSprite <> 0 and initAll.sprite <> 0 then
        executeMessage = initAll.sprite / initAll.reserveSprite * 100
      end if
    end if
  end if
end
on script date, error
  me = error
  if me = 0 then
    session("OK")
  else
    if me = 1 then
      session("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if me = 4 then
        session("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if me = 5 then
          session("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if me = 6 then
            session("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if me = 20 then
              session("File to be written to is read-only")
            else
              if me = 900 then
                session("Disk is full.")
              else
                if me = 903 then
                  session("Bad filespec")
                else
                  if me = 905 then
                    session("postNetText syntax-error ")
                  else
                    if me = 2018 then
                      session("Failed network operation")
                    else
                      if me = 4144 then
                        session("Connection could not be established with the remote host")
                      else
                        if me = 4145 then
                          session("Connection could not be established with the remote host")
                        else
                          if me = 4146 then
                            session("Data supplied by the server was in an unexpected format")
                          else
                            if me = 4149 then
                              session("Unexpected early closing of connection")
                            else
                              if me = 4150 then
                                session("Operation could not be completed due to timeout.")
                              else
                                if me = 4154 then
                                  session("Not enough memory available to complete the transaction")
                                else
                                  if me = 4155 then
                                    session("Protocol reply to request indicates an error in the reply")
                                  else
                                    if me = 4156 then
                                      session("Transaction failed to be authenticated")
                                    else
                                      if me = 4157 then
                                        session("Invalid URL")
                                      else
                                        if me = 4159 then
                                          session("Could not create a socket")
                                        else
                                          if me = 4164 then
                                            session("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if me = 4165 then
                                              session("Generic proxy failure")
                                            else
                                              if me = 4166 then
                                                session("Transfer was intentionally interrupted by client")
                                              else
                                                if me = 4167 then
                                                  session("Download stopped by netAbort(url)")
                                                else
                                                  if me = 4242 then
                                                    session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if me = 4836 then
                                                      session("Data returned is truncated")
                                                    else
                                                      if me = 4144 then
                                                        session("Connection could not be established with the remote host")
                                                      else
                                                        if me = 4145 then
                                                          session("Connection could not be established with the remote host")
                                                        else
                                                          if me = 4146 then
                                                            session("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if me = 4147 then
                                                              session("Connection could not be established with the remote host")
                                                            else
                                                              if me = 4148 then
                                                                session("Connection could not be established with the remote host")
                                                              else
                                                                if me = 4149 then
                                                                  session("Unexpected early closing of connection")
                                                                else
                                                                  if me = 4150 then
                                                                    session("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if me = 4151 then
                                                                      session("Connection could not be established with the remote host")
                                                                    else
                                                                      if me = 4152 then
                                                                        session("Operation could not be completed due to timeout")
                                                                      else
                                                                        if me = 4153 then
                                                                          session("Connection could not be established with the remote host")
                                                                        else
                                                                          if me = 4154 then
                                                                            session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if me = 4155 then
                                                                              session("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if me = 4157 then
                                                                                session("Invalid URL")
                                                                              else
                                                                                if me = 4159 then
                                                                                  session("Could not create a socket")
                                                                                else
                                                                                  if me = 4160 then
                                                                                    session("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if me = 4161 then
                                                                                      session("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if me = 4162 then
                                                                                        session("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if me = 4163 then
                                                                                          session("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if me = 4164 then
                                                                                            session("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if me = 4165 then
                                                                                              session("Generic proxy failure")
                                                                                            else
                                                                                              if me = 4166 then
                                                                                                session("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if me = 4167 then
                                                                                                  session("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if me = 4168 then
                                                                                                    session("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if me = 4240 then
                                                                                                      session("Unknown error!")
                                                                                                    else
                                                                                                      if me = 4242 then
                                                                                                        session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if me = 4836 then
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