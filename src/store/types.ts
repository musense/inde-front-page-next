export interface StateProps {
    clientWidth : number;
    clientHeight: number;
    contents    : string;
    categoryName: string;
    pathname    : string;
    lastPathname: string;
    active      : boolean;
}

export enum ReducerActionEnum {
    SET_WINDOW_SIZE            = 'SET_WINDOW_SIZE',
    SET_ALL_CONTENTS           = 'SET_ALL_CONTENTS',
    SET_CATEGORY_NAME          = 'SET_CATEGORY_NAME',
    SET_PATHNAME               = 'SET_PATHNAME',
    SET_LAST_PATHNAME          = 'SET_LAST_PATHNAME',
    SET_NAVBAR_ACTIVE_STATUS = 'SET_NAVBAR_ACTIVE_TO_FALSE',
}

export type ReducerAction = {
    type: ReducerActionEnum,
    payload: payloadProps,
}
export type payloadProps = {
    width       ?: number ,
    height      ?: number ,
    contents    ?: string ,
    categoryName?: string ,
    pathname    ?: string ,
    lastPathname?: string ,
    active      ?: boolean,
}
