import { BehaviorTreeNode } from ".."

export interface TurnRelayOff extends BehaviorTreeNode {
    namespace: string
    relayRemap: string | null
}

export const TURN_RELAY_OFF_DEFAULT: TurnRelayOff = {
    label: "Turn Relay Off",
    namespace: "/",
    relayRemap: null
}

export interface TurnRelayOn extends BehaviorTreeNode {
    namespace: string
    relayRemap: string | null
}

export const TURN_RELAY_ON_DEFAULT: TurnRelayOn = {
    label: "Turn Relay On",
    namespace: "/",
    relayRemap: null
}