import { BehaviorProps } from "..";

export interface SendMotorToTargetProps extends BehaviorProps {
    namespace: string
}

export const SEND_MOTOR_TO_TARGET_PROPS_DEFAULT: SendMotorToTargetProps = {
    name: "Send Motor to Target",
    namespace: "/"
}