-- Script
property m_bReady
property m_ar_sMapFileName
property m_iProcessNumber

on construct this
  m_bReady = 0
  m_iProcessNumber = getThread(#main).component.GetProcessManager().QueueProcessTurn()
  registerMessage("start_process_" & m_iProcessNumber, this.getID(), #_LoadMapFile)
  return 1
end
on deconstruct this
  m_bReady = 0
  return 1
end
on IsReady this
  return m_bReady
end
on _LoadMapFile this
  unregisterMessage("start_process_" & m_iProcessNumber, this.getID())
  if not getObjectManager().exists("FigureSetLoadingDialog") then
    t_rObj = createObject("FigureSetLoadingDialog", "CLoadingWindow")
    t_rObj.DefineWindow([#headline: getText("avatar.loading.figureset.headline"), #infotext: getText("avatar.loading.figureset.info"), #showbutton: 0, #modal: 0, #client: this.getID()])
  end if
  m_ar_sMapFileName = []
  if variableExists("figureset_url") then
    t_sFile = getVariable("figureset_url")
    t_sMember = "figureTexts1"
    t_iMember = queueDownload(t_sFile, t_sMember, #field)
    m_ar_sMapFileName.add(t_sFile)
    registerDownloadCallback(t_iMember, #_FileLoadCallback, this.getID(), t_sMember)
    m_bReady = 0
  else
    error(this, "URL for figure set not defined!", #_LoadMapFile)
    m_bReady = 1
    getThread(#main).component.GetProcessManager().ProcessReadyCallback(m_iProcessNumber)
  end if
end
on _FileLoadCallback this, a_sMember
  if getObjectManager().exists("FigureSetLoadingDialog") then
    removeObject("FigureSetLoadingDialog", "CLoadingWindow")
  end if
  if memberExists("figureTexts1") then
    dumpVariableField(member(getmemnum("figureTexts1")))
  end if
  m_bReady = 1
  getThread(#main).component.GetProcessManager().ProcessReadyCallback(m_iProcessNumber)
  getThread(#AvatarFactory).component.CreatetClothAssetManager()
end