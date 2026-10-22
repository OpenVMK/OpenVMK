-- Behavior
on CreateBrokerManager
  return createManager(#broker_manager, GetClsVariable("broker.manager.class"))
end
on RemoveBrokerManager
  return removeManager(#broker_manager)
end
on getBrokerManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#broker_manager) then
    return t_rMgr.getManager(#broker_manager)
  else
    return CreateBrokerManager()
  end if
end
on createBroker a_sMessage
  return getBrokerManager().create(a_sMessage)
end
on removeBroker a_sMessage
  return getBrokerManager().Remove(a_sMessage)
end
on getBroker a_sMessage
  return getBrokerManager().get(a_sMessage)
end
on brokerExists a_sMessage
  return getBrokerManager().exists(a_sMessage)
end
on printBrokers
  return getBrokerManager().print()
end
on registerMessage a_sMessage, a_sClientID, a_kMethod
  return getBrokerManager().register(a_sMessage, a_sClientID, a_kMethod)
end
on unregisterMessage a_sMessage, a_sClientID
  return getBrokerManager().unregister(a_sMessage, a_sClientID)
end
on executeMessage a_sMessage, a_vArgA, a_vArgB, a_vArgC
  return getBrokerManager().Execute(a_sMessage, a_vArgA, a_vArgB, a_vArgC)
end