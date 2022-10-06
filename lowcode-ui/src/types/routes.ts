
import { RoutesItemType } from 'react-router-waiter'

export interface RoutesItemTypeNew extends RoutesItemType {
  path:string
  url?: string;
}

export type RoutesTypeNew = RoutesItemTypeNew[]
