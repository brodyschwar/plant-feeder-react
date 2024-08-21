import { BehaviorProps } from ".."

export interface TurnRelayOffProps extends BehaviorProps {
    namespace: string
    relayRemap: string | null
}

export const TURN_RELAY_OFF_PROPS_DEFAULT: TurnRelayOffProps = {
    name: "Turn Relay Off",
    namespace: "/",
    relayRemap: null
}