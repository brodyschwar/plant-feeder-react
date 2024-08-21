import { BehaviorProps } from ".."

export interface TurnRelayOnProps extends BehaviorProps {
    namespace: string
    relayRemap: string | null
}

export const TURN_RELAY_ON_PROPS_DEFAULT: TurnRelayOnProps = {
    name: "Turn Relay On",
    namespace: "/",
    relayRemap: null
}

