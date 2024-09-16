export const NODE_LIST: { data: any, type: string, folder: string}[] = [
    {"data": {"namespace": "/", "className": "SendMotorToTarget", "label": "Send Motor To Target"}, "type": "behaviorNode", "folder": "Behaviors/Motor Actions"},
    {"data": {"spin_clockwise": false, "namespace": "/", "className": "SpinMotor", "label": "Spin Motor"}, "type": "behaviorNode", "folder": "Behaviors/Motor Actions"},
    {"data": {"message": "", "className": "PrintMessage", "label": "Print Message"}, "type": "behaviorNode", "folder": "Behaviors/Console Actions"},
    {"data": {"message": "Press [Enter] to continue", "className": "WaitForInput", "label": "Wait For Input"}, "type": "behaviorNode", "folder": "Behaviors/Console Actions"},
    {"data": {"namespace": "/", "className": "WaitForMotorStop", "label": "Wait For Motor Stop"}, "type": "behaviorNode", "folder": "Behaviors/Motor Actions"},
    {"data": {"namespace": "/", "local_remap": null, "className": "TurnRelayOff", "label": "Turn Relay Off"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"namespace": "/", "local_remap": null, "className": "TurnRelayOn", "label": "Turn Relay On"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "BindMotorsToPositions", "label": "Bind Motors To Positions"}, "type": "behaviorNode", "folder": "Behaviors/Binders"},
    {"data": {"className": "StopAllMotors", "label": "Stop All Motors"}, "type": "behaviorNode", "folder": "Behaviors/Motor Actions"},
    {"data": {"namespace": "", "className": "IsButtonPressed", "label": "Is Button Pressed"}, "type": "behaviorNode", "folder": "Device/Button Actions"},
    {"data": {"namespace": "/", "className": "SetMaximumToPosition", "label": "Set Maximum To Position"}, "type": "behaviorNode", "folder": "Behaviors/Calibrations"},
    {"data": {"className": "ResetDrawerPosition", "label": "Reset Drawer Position"}, "type": "behaviorNode", "folder": "Device/Drawer Motor"},
    {"data": {"className": "ResetLiftPosition", "label": "Reset Lift Position"}, "type": "behaviorNode", "folder": "Device/Lift Motor"},
    {"data": {"className": "ResetRightArmPosition", "label": "Reset Right Arm Position"}, "type": "behaviorNode", "folder": "Device/Right Arm Motor"},
    {"data": {"className": "ResetLeftArmPosition", "label": "Reset Left Arm Position"}, "type": "behaviorNode", "folder": "Device/Left Arm Motor"},
    {"data": {"className": "SendDrawerToTarget", "label": "Send Drawer To Target"}, "type": "behaviorNode", "folder": "Device/Drawer Motor"},
    {"data": {"className": "SendLiftToTarget", "label": "Send Lift To Target"}, "type": "behaviorNode", "folder": "Device/Lift Motor"},
    {"data": {"className": "SendLiftArmToTarget", "label": "Send Lift Arm To Target"}, "type": "behaviorNode", "folder": "Device/Left Arm Motor"},
    {"data": {"className": "SendRigthArmToTarget", "label": "Send Rigth Arm To Target"}, "type": "behaviorNode", "folder": "Device/Right Arm Motor"},
    {"data": {"slide_out": false, "className": "MoveDrawer", "label": "Move Drawer"}, "type": "behaviorNode", "folder": "Device/Drawer Motor"},
    {"data": {"slide_up": false, "className": "MoveLift", "label": "Move Lift"}, "type": "behaviorNode", "folder": "Device/Lift Motor"},
    {"data": {"move_left": false, "className": "MoveLeftArm", "label": "Move Left Arm"}, "type": "behaviorNode", "folder": "Device/Left Arm Motor"},
    {"data": {"move_right": false, "className": "MoveRightArm", "label": "Move Right Arm"}, "type": "behaviorNode", "folder": "Device/Right Arm Motor"},
    {"data": {"className": "WaitForDrawerToStop", "label": "Wait For Drawer To Stop"}, "type": "behaviorNode", "folder": "Device/Drawer Motor"},
    {"data": {"className": "WaitForLiftToStop", "label": "Wait For Lift To Stop"}, "type": "behaviorNode", "folder": "Device/Lift Motor"},
    {"data": {"className": "WaitForLeftArmToStop", "label": "Wait For Left Arm To Stop"}, "type": "behaviorNode", "folder": "Device/Left Arm Motor"},
    {"data": {"className": "WaitForRightArmToStop", "label": "Wait For Right Arm To Stop"}, "type": "behaviorNode", "folder": "Device/Right Arm Motor"},
    {"data": {"className": "DisableLiftMotors", "label": "Disable Lift Motors"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "DisableClawAndDrawerMotors", "label": "Disable Claw And Drawer Motors"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "TurnOffWater", "label": "Turn Off Water"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "EnableLiftMotors", "label": "Enable Lift Motors"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "EnableClawAndDrawerMotors", "label": "Enable Claw And Drawer Motors"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "TurnOnWater", "label": "Turn On Water"}, "type": "behaviorNode", "folder": "Behaviors/Relay Actions"},
    {"data": {"className": "IsDrawerButtonPressed", "label": "Is Drawer Button Pressed"}, "type": "behaviorNode", "folder": "Device/Button Actions"},
    {"data": {"className": "IsLiftButtonPressed", "label": "Is Lift Button Pressed"}, "type": "behaviorNode", "folder": "Device/Button Actions"},
    {"data": {"className": "IsLeftArmButtonPressed", "label": "Is Left Arm Button Pressed"}, "type": "behaviorNode", "folder": "Device/Button Actions"},
    {"data": {"className": "IsRightArmButtonPressed", "label": "Is Right Arm Button Pressed"}, "type": "behaviorNode", "folder": "Device/Button Actions"},
    {"data": {"button_namespace": "/", "className": "StopMotorWithButton", "label": "Stop Motor With Button"}, "type": "decoratorNode", "folder": "Decorator/Motor Stops"},
    {"data": {"message": "Press [Enter] to stop", "className": "StopMotorOnInput", "label": "Stop Motor On Input"}, "type": "decoratorNode", "folder": "Behaviors/Console Actions"},
    {"data": {"className": "StopMotorWithDrawerButton", "label": "Stop Motor With Drawer Button"}, "type": "decoratorNode", "folder": "Decorator/Motor Stops"},
    {"data": {"className": "StopMotorWithLiftButton", "label": "Stop Motor With Lift Button"}, "type": "decoratorNode", "folder": "Decorator/Motor Stops"},
    {"data": {"className": "StopMotorWithLeftArmButton", "label": "Stop Motor With Left Arm Button"}, "type": "decoratorNode", "folder": "Decorator/Motor Stops"},
    {"data": {"className": "StopMotorWithRightArmButton", "label": "Stop Motor With Right Arm Button"}, "type": "decoratorNode", "folder": "Decorator/Motor Stops"},
    {"data": {"className": "OneShotOnSuccess", "label": "One Shot On Success"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"status": "", "className": "Condition", "label": "Condition"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"className": "Count", "label": "Count"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"condition": "", "blackboard_keys": null, "className": "EternalGuard", "label": "Eternal Guard"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"className": "Inverter", "label": "Inverter"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"policy": "", "className": "OneShot", "label": "One Shot"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"num_success": 0, "className": "Repeat", "label": "Repeat"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"num_failures": 0, "className": "Retry", "label": "Retry"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"variable_name": "", "className": "StatusToBlackboard", "label": "Status To Blackboard"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"duration": 5.0, "className": "Timeout", "label": "Timeout"}, "type": "decoratorNode", "folder": "Decorator/Built in"},
    {"data": {"className": "FailureIsRunning", "label": "Failure Is Running"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"className": "FailureIsSuccess", "label": "Failure Is Success"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"className": "SuccessIsFailure", "label": "Success Is Failure"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"className": "SuccessIsRunning", "label": "Success Is Running"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"className": "RunningIsFailure", "label": "Running Is Failure"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"className": "RunningIsSuccess", "label": "Running Is Success"}, "type": "decoratorNode", "folder": "Decorator/X is Y"},
    {"data": {"memory": false, "className": "Selector", "label": "Selector"}, "type": "compositeNode", "folder": "Composites"},
    {"data": {"memory": false, "className": "Sequence", "label": "Sequence"}, "type": "compositeNode", "folder": "Composites"},
    {"data": {"policy": "", "className": "Parallel", "label": "Parallel"}, "type": "compositeNode", "folder": "Composites"},
    {"data": {"variable_name": "", "className": "BlackboardToStatus", "label": "Blackboard To Status"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"variable_name": "", "className": "CheckBlackboardVariableExists", "label": "Check Blackboard Variable Exists"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"check": "", "className": "CheckBlackboardVariableValue", "label": "Check Blackboard Variable Value"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"checks": "", "operator": "", "namespace": null, "className": "CheckBlackboardVariableValues", "label": "Check Blackboard Variable Values"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"className": "Dummy", "label": "Dummy"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"className": "Failure", "label": "Failure"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"n": 0, "className": "Periodic", "label": "Periodic"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"className": "Running", "label": "Running"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"variable_name": "", "variable_value": "", "overwrite": false, "className": "SetBlackboardVariable", "label": "Set Blackboard Variable"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"queue": "", "eventually": "", "className": "StatusQueue", "label": "Status Queue"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"className": "Success", "label": "Success"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"n": 0, "className": "SuccessEveryN", "label": "Success Every N"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"duration": 0, "completion_status": "", "className": "TickCounter", "label": "Tick Counter"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"key": "", "className": "UnsetBlackboardVariable", "label": "Unset Blackboard Variable"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"variable_name": "", "className": "WaitForBlackboardVariable", "label": "Wait For Blackboard Variable"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},
    {"data": {"check": "", "className": "WaitForBlackboardVariableValue", "label": "Wait For Blackboard Variable Value"}, "type": "behaviorNode", "folder": "Behaviors/Built in"},

];
