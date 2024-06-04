import { UnifiedRocket } from "types/UnifiedRocket";

export interface SpaceProvider {
  getRocketsOne(rocketId: string): Promise<UnifiedRocket>;
}
