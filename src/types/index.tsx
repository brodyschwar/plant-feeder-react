export interface BehaviorProps {
    name: string
}

export interface CompositeProps {
    name: string
}

export interface TestProps {
    numer: number,
    string: string,
    enum: TestEnum,
    bool: boolean
}

export enum TestEnum {
    ONE = "1",
    TWO = "2"
}