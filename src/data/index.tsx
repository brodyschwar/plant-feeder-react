import { 
    TURN_RELAY_OFF_DEFAULT, 
    TURN_RELAY_ON_DEFAULT 
} from "./behaviors"
import { 
    SEND_MOTOR_TO_TARGET_DEFAULT, 
    WAIT_FOR_MOTOR_TO_STOP_DEFAULT 
} from "./behaviors/motorActions"
import { PARRALLEL_DEFAULT, SELECTOR_DEFAULT, SEQUENCE_DEFAULT } from "./composites"

export interface BehaviorTreeNodeMenuLayout {
    name: string,
    nodes: { data: BehaviorTreeNode, type: string }[],
    nodeFiles: BehaviorTreeNodeMenuLayout[]
}

export interface BehaviorTreeNode {
    label: string
}

const BEHAVIORS_MENU_LAYOUT: BehaviorTreeNodeMenuLayout = {
    name: "Behaviors",
    nodes: [
        { data: TURN_RELAY_ON_DEFAULT, type: "behaviorNode"},
        { data: TURN_RELAY_OFF_DEFAULT, type: "behaviorNode"}
    ],
    nodeFiles: [
        {
            name: "Motor Actions",
            nodes: [
                { data: SEND_MOTOR_TO_TARGET_DEFAULT, type: "behaviorNode"},
                { data: WAIT_FOR_MOTOR_TO_STOP_DEFAULT, type: "behaviorNode"}
            ],
            nodeFiles: []
        }
    ]
}

const COMPOSITES_MENU_LAYOUT: BehaviorTreeNodeMenuLayout = {
    name: "Composites",
    nodes: [
        { data: SEQUENCE_DEFAULT, type: "compositeNode"},
        { data: SELECTOR_DEFAULT, type: "compositeNode"},
        { data: PARRALLEL_DEFAULT, type: "compositeNode"}
    ],
    nodeFiles: [

    ]
}

export const NODE_MENU_LAYOUT: BehaviorTreeNodeMenuLayout[] = [
    BEHAVIORS_MENU_LAYOUT,
    COMPOSITES_MENU_LAYOUT
]