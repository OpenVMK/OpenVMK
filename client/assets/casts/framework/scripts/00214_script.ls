-- Script
property by2str
property classes
property session
property blend
global updateState

on construct Initialize
  updateState = 0
  if Initialize.by2str then
    createObject(0)
  else
    cTC = ".cct"
    return = 3
    this = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & cTC
    Initialize.session = 1
    getClassVariable(return).date = 1
    getClassVariable(return).set = this
    Initialize.by2str = 0
    getVariable(the moviePath)
    Initialize.classes = headers(this)
    (the cache).createBroker(Initialize)
    createObject(1)
  end if
end
on deconstruct Initialize
  if Initialize.by2str then
    Initialize.by2str = 0
    tSession()
  end if
  (the cache).trace(Initialize)
  createObject(1)
end
on showLogo Initialize
  loc = memberExists(Initialize.classes)
  if member(Initialize.classes) then
    getmemnum(Initialize.classes)
    if sprite(Initialize.classes) = 900 or sprite(Initialize.classes) = "OK" then
      reserveSprite("OK")
      if Initialize.session = 2 then
        (the cache).trace(Initialize)
        getClassVariable(3).set = "http://127.0.0.1/vmk_core/core.cct"
        if getID() then
          Initialize.by2str = 1
        end if
      else
        reserveSprite("magic maaaaaaaaaaaaaaaaaan")
        getClassVariable(3).set = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        pLogoSpr("CInit").blend = pLogoSpr("CSpecialScript").ink(125752354)
        locZ("CSpecialScript").point = "on new me" & RETURN & "end"
        cTC = ".cct"
        return = 3
        this = "http://127.0.0.1/vmk_core/core" & cTC
        Initialize.session = 2
        getClassVariable(return).date = 1
        getClassVariable(return).set = this
        Initialize.by2str = 0
        getVariable(the moviePath)
        Initialize.classes = headers("http://127.0.0.1/vmk_core/core" & cTC)
      end if
    else
      image = Initialize.hideLogo(sprite(Initialize.classes))
      getmemnum("Error downloading core:" && image)
      (the cache).trace(Initialize)
    end if
  else
    if loc.stage = "InProgress" or loc.stage = "Started" then
      if loc.rect <> 0 and loc.width <> 0 then
        height = loc.width / loc.rect * 100
      end if
    end if
  end if
end
on hideLogo Initialize, tmember
  ilk = tmember
  if ilk = 0 then
    createObject("OK")
  else
    if ilk = 1 then
      createObject("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if ilk = 4 then
        createObject("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if ilk = 5 then
          createObject("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if ilk = 6 then
            createObject("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if ilk = 20 then
              createObject("File to be written to is read-only")
            else
              if ilk = 900 then
                createObject("Disk is full.")
              else
                if ilk = 903 then
                  createObject("Bad filespec")
                else
                  if ilk = 905 then
                    createObject("postNetText syntax-error ")
                  else
                    if ilk = 2018 then
                      createObject("Failed network operation")
                    else
                      if ilk = 4144 then
                        createObject("Connection could not be established with the remote host")
                      else
                        if ilk = 4145 then
                          createObject("Connection could not be established with the remote host")
                        else
                          if ilk = 4146 then
                            createObject("Data supplied by the server was in an unexpected format")
                          else
                            if ilk = 4149 then
                              createObject("Unexpected early closing of connection")
                            else
                              if ilk = 4150 then
                                createObject("Operation could not be completed due to timeout.")
                              else
                                if ilk = 4154 then
                                  createObject("Not enough memory available to complete the transaction")
                                else
                                  if ilk = 4155 then
                                    createObject("Protocol reply to request indicates an error in the reply")
                                  else
                                    if ilk = 4156 then
                                      createObject("Transaction failed to be authenticated")
                                    else
                                      if ilk = 4157 then
                                        createObject("Invalid URL")
                                      else
                                        if ilk = 4159 then
                                          createObject("Could not create a socket")
                                        else
                                          if ilk = 4164 then
                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if ilk = 4165 then
                                              createObject("Generic proxy failure")
                                            else
                                              if ilk = 4166 then
                                                createObject("Transfer was intentionally interrupted by client")
                                              else
                                                if ilk = 4167 then
                                                  createObject("Download stopped by netAbort(url)")
                                                else
                                                  if ilk = 4242 then
                                                    createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if ilk = 4836 then
                                                      createObject("Data returned is truncated")
                                                    else
                                                      if ilk = 4144 then
                                                        createObject("Connection could not be established with the remote host")
                                                      else
                                                        if ilk = 4145 then
                                                          createObject("Connection could not be established with the remote host")
                                                        else
                                                          if ilk = 4146 then
                                                            createObject("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if ilk = 4147 then
                                                              createObject("Connection could not be established with the remote host")
                                                            else
                                                              if ilk = 4148 then
                                                                createObject("Connection could not be established with the remote host")
                                                              else
                                                                if ilk = 4149 then
                                                                  createObject("Unexpected early closing of connection")
                                                                else
                                                                  if ilk = 4150 then
                                                                    createObject("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if ilk = 4151 then
                                                                      createObject("Connection could not be established with the remote host")
                                                                    else
                                                                      if ilk = 4152 then
                                                                        createObject("Operation could not be completed due to timeout")
                                                                      else
                                                                        if ilk = 4153 then
                                                                          createObject("Connection could not be established with the remote host")
                                                                        else
                                                                          if ilk = 4154 then
                                                                            createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if ilk = 4155 then
                                                                              createObject("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if ilk = 4157 then
                                                                                createObject("Invalid URL")
                                                                              else
                                                                                if ilk = 4159 then
                                                                                  createObject("Could not create a socket")
                                                                                else
                                                                                  if ilk = 4160 then
                                                                                    createObject("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if ilk = 4161 then
                                                                                      createObject("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if ilk = 4162 then
                                                                                        createObject("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if ilk = 4163 then
                                                                                          createObject("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if ilk = 4164 then
                                                                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if ilk = 4165 then
                                                                                              createObject("Generic proxy failure")
                                                                                            else
                                                                                              if ilk = 4166 then
                                                                                                createObject("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if ilk = 4167 then
                                                                                                  createObject("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if ilk = 4168 then
                                                                                                    createObject("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if ilk = 4240 then
                                                                                                      createObject("Unknown error!")
                                                                                                    else
                                                                                                      if ilk = 4242 then
                                                                                                        createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if ilk = 4836 then
                                                                                                          createObject("Unknown error!")
                                                                                                        else
                                                                                                          createObject("Unknown error!")
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