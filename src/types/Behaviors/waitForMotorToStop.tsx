import { BehaviorProps } from "..";

export interface WaitForMotorToStopProps extends BehaviorProps {
    namespace: string
}

export const WAIT_FOR_MOTOR_TO_STOP_PROPS_DEFAULT: WaitForMotorToStopProps = {
    name: "Wait for Motor to Stop",
    namespace: "/",
}