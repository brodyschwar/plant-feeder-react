import { BehaviorTreeNode } from "../.."

interface SendMotorToTarget extends BehaviorTreeNode {
    namespace: string
}

export const SEND_MOTOR_TO_TARGET_DEFAULT: SendMotorToTarget = {
    label: "Send Motor to Target",
    namespace: "/"
}

export interface WaitForMotorToStop extends BehaviorTreeNode {
    namespace: string
}

export const WAIT_FOR_MOTOR_TO_STOP_DEFAULT: WaitForMotorToStop = {
    label: "Wait for Motor to Stop",
    namespace: "/",
}