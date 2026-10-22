-- Script
property by2str
property classes
property session
property locZ
global updateState

on construct Initialize
  updateState = 0
  if Initialize.by2str then
    createObject(0)
  else
    return = ".cct"
    this = 3
    tSession = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & return
    Initialize.session = 1
    getClassVariable(this).date = 1
    getClassVariable(this).set = tSession
    Initialize.by2str = 0
    getVariable(the moviePath)
    Initialize.classes = headers(tSession)
    (the cache).createBroker(Initialize)
    createObject(1)
  end if
end
on deconstruct Initialize
  if Initialize.by2str then
    Initialize.by2str = 0
    trace()
  end if
  (the cache).memberExists(Initialize)
  createObject(1)
end
on showLogo Initialize
  image = member(Initialize.classes)
  if getmemnum(Initialize.classes) then
    sprite(Initialize.classes)
    if reserveSprite(Initialize.classes) = 900 or reserveSprite(Initialize.classes) = "OK" then
      getID("OK")
      if Initialize.session = 2 then
        (the cache).memberExists(Initialize)
        getClassVariable(3).set = "http://127.0.0.1/vmk_core/core.cct"
        if pLogoSpr() then
          Initialize.by2str = 1
        end if
      else
        getID("magic maaaaaaaaaaaaaaaaaan")
        getClassVariable(3).set = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        ink("CInit").locZ = ink("CSpecialScript").blend(125752354)
        point("CSpecialScript").stage = "on new me" & RETURN & "end"
        return = ".cct"
        this = 3
        tSession = "http://127.0.0.1/vmk_core/core" & return
        Initialize.session = 2
        getClassVariable(this).date = 1
        getClassVariable(this).set = tSession
        Initialize.by2str = 0
        getVariable(the moviePath)
        Initialize.classes = headers("http://127.0.0.1/vmk_core/core" & return)
      end if
    else
      tmember = Initialize.hideLogo(reserveSprite(Initialize.classes))
      sprite("Error downloading core:" && tmember)
      (the cache).memberExists(Initialize)
    end if
  else
    if image.rect = "InProgress" or image.rect = "Started" then
      if image.width <> 0 and image.height <> 0 then
        loc = image.height / image.width * 100
      end if
    end if
  end if
end
on hideLogo Initialize, ilk
  releaseSprite = ilk
  if releaseSprite = 0 then
    createObject("OK")
  else
    if releaseSprite = 1 then
      createObject("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if releaseSprite = 4 then
        createObject("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if releaseSprite = 5 then
          createObject("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if releaseSprite = 6 then
            createObject("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if releaseSprite = 20 then
              createObject("File to be written to is read-only")
            else
              if releaseSprite = 900 then
                createObject("Disk is full.")
              else
                if releaseSprite = 903 then
                  createObject("Bad filespec")
                else
                  if releaseSprite = 905 then
                    createObject("postNetText syntax-error ")
                  else
                    if releaseSprite = 2018 then
                      createObject("Failed network operation")
                    else
                      if releaseSprite = 4144 then
                        createObject("Connection could not be established with the remote host")
                      else
                        if releaseSprite = 4145 then
                          createObject("Connection could not be established with the remote host")
                        else
                          if releaseSprite = 4146 then
                            createObject("Data supplied by the server was in an unexpected format")
                          else
                            if releaseSprite = 4149 then
                              createObject("Unexpected early closing of connection")
                            else
                              if releaseSprite = 4150 then
                                createObject("Operation could not be completed due to timeout.")
                              else
                                if releaseSprite = 4154 then
                                  createObject("Not enough memory available to complete the transaction")
                                else
                                  if releaseSprite = 4155 then
                                    createObject("Protocol reply to request indicates an error in the reply")
                                  else
                                    if releaseSprite = 4156 then
                                      createObject("Transaction failed to be authenticated")
                                    else
                                      if releaseSprite = 4157 then
                                        createObject("Invalid URL")
                                      else
                                        if releaseSprite = 4159 then
                                          createObject("Could not create a socket")
                                        else
                                          if releaseSprite = 4164 then
                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if releaseSprite = 4165 then
                                              createObject("Generic proxy failure")
                                            else
                                              if releaseSprite = 4166 then
                                                createObject("Transfer was intentionally interrupted by client")
                                              else
                                                if releaseSprite = 4167 then
                                                  createObject("Download stopped by netAbort(url)")
                                                else
                                                  if releaseSprite = 4242 then
                                                    createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if releaseSprite = 4836 then
                                                      createObject("Data returned is truncated")
                                                    else
                                                      if releaseSprite = 4144 then
                                                        createObject("Connection could not be established with the remote host")
                                                      else
                                                        if releaseSprite = 4145 then
                                                          createObject("Connection could not be established with the remote host")
                                                        else
                                                          if releaseSprite = 4146 then
                                                            createObject("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if releaseSprite = 4147 then
                                                              createObject("Connection could not be established with the remote host")
                                                            else
                                                              if releaseSprite = 4148 then
                                                                createObject("Connection could not be established with the remote host")
                                                              else
                                                                if releaseSprite = 4149 then
                                                                  createObject("Unexpected early closing of connection")
                                                                else
                                                                  if releaseSprite = 4150 then
                                                                    createObject("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if releaseSprite = 4151 then
                                                                      createObject("Connection could not be established with the remote host")
                                                                    else
                                                                      if releaseSprite = 4152 then
                                                                        createObject("Operation could not be completed due to timeout")
                                                                      else
                                                                        if releaseSprite = 4153 then
                                                                          createObject("Connection could not be established with the remote host")
                                                                        else
                                                                          if releaseSprite = 4154 then
                                                                            createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if releaseSprite = 4155 then
                                                                              createObject("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if releaseSprite = 4157 then
                                                                                createObject("Invalid URL")
                                                                              else
                                                                                if releaseSprite = 4159 then
                                                                                  createObject("Could not create a socket")
                                                                                else
                                                                                  if releaseSprite = 4160 then
                                                                                    createObject("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if releaseSprite = 4161 then
                                                                                      createObject("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if releaseSprite = 4162 then
                                                                                        createObject("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if releaseSprite = 4163 then
                                                                                          createObject("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if releaseSprite = 4164 then
                                                                                            createObject("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if releaseSprite = 4165 then
                                                                                              createObject("Generic proxy failure")
                                                                                            else
                                                                                              if releaseSprite = 4166 then
                                                                                                createObject("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if releaseSprite = 4167 then
                                                                                                  createObject("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if releaseSprite = 4168 then
                                                                                                    createObject("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if releaseSprite = 4240 then
                                                                                                      createObject("Unknown error!")
                                                                                                    else
                                                                                                      if releaseSprite = 4242 then
                                                                                                        createObject("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if releaseSprite = 4836 then
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