import { Result } from "dispatch";
import { Route } from "OpenApiRouter";
import { providers } from "services/providers";

export const handleRocketsOne = async (_route: Route): Promise<Result> => {
  const providerName = _route.headers["x-provider"] as string;
  const rocketId = _route.pathParameters.rocketId;
  if (!providerName) {
    return {
      status: 400,
      body: {
        message: "Provider header is required"
      }
    };
  }
  if (!rocketId) {
    return {
      status: 400,
      body: {
        message: "Rocket ID is required"
      }
    };
  }
  const provider = providers[providerName];
  if (!provider) {
    return {
      status: 404,
      body: {
        message: `Provider ${providerName} not found`
      }
    };
  }
  try {
    const response = await provider.getRocketsOne(rocketId);
    return {
      status: 200,
      body: response
    };
  } catch (error) {
    return {
      status: error.statusCode || 500,
      body: {
        message: error.message || "Internal Server Error"
      }
    };
  }
};
