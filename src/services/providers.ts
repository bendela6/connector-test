import { SpaceProvider } from "types/SpaceProvider";
import { SpacexProvider } from "services/spaceX";

export const providers: Record<string, SpaceProvider> = {
  spacex: new SpacexProvider()
};
