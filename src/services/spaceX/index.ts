import { openApiSpec } from "./openApiSpec";
import { components, paths } from "./types";
import { SpaceProvider } from "types/SpaceProvider";
import { HttpError } from "types/HttpError";
import createClient from "openapi-fetch";
import { getBasePathByOpenApiSpec } from "utils/openApi";
import { Ajv } from "ajv";

type RocketOneResponse = components["schemas"]["RocketOneResponse"];
const rocketOneSchema = openApiSpec.components.schemas.RocketOneResponse;

export class SpacexProvider implements SpaceProvider {

  private client: ReturnType<typeof createClient<paths>>;

  constructor() {
    const baseUrl = getBasePathByOpenApiSpec(openApiSpec);
    this.client = createClient<paths>({ baseUrl });
  }

  async getRocketsOne(rocketId: string) {
    const response = await this.client.GET("/rockets/{rocketId}", {
      params: { path: { rocketId } },
    });

    if ("error" in response) {
      const error = new HttpError(response.error?.error || "Failed to fetch RocketOne data");
      error.statusCode = response.response.status;
      throw error;
    }

    const { data } = response;

    const ajv = new Ajv();
    if (!ajv.validate(rocketOneSchema, data)) {
      const msg = ajv.errorsText(ajv.errors);
      const error = new HttpError(`Failed to validate RocketOne data: ${msg}`);
      error.statusCode = 500;
      throw error;
    }

    return this.mapRocketData(data);
  }


  private mapRocketData(data: RocketOneResponse) {
    return {
      id: data.id.toString(),
      company: data.company.toUpperCase(),
      country: data.country,
      main_image: data.flickr_images[0],
      cost_per_launch: {
        amount: data.cost_per_launch,
        currency: "USD"
      }
    };
  }
}

