import type {
 ElementTreeObject,
 ElementTreeData,
} from "../Elements/ElementTreeData.types";

export type BaseComponentProps = {
 children?: ElementTreeData;
} & any;

export type Component<T> = (
 props: any
) => [ElementTreeData, (set: Record<keyof T, any>) => void];
