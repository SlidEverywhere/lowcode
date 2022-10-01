
import { RoutesItemType } from 'react-router-waiter'

export interface RoutesItemTypeNew extends RoutesItemType {
  url?: string;
}

export type RoutesTypeNew = RoutesItemTypeNew[]
