import { Route } from "OpenApiRouter";
import { handleRocketsOne } from ".";

describe("rocketsOne operation", () => {

  const handle = ({ rocketId, provider }: { rocketId?: string, provider?: string }) => {
    const route: Route = {
      route: "/space/rockets/{rocketId}",
      operation: {
        operationId: "rocketsOne",
        responses: {},
      },
      pathParameters: {},
      headers: {},
    };

    if (rocketId) {
      route.pathParameters.rocketId = rocketId;
    }

    if (provider) {
      route.headers["x-provider"] = provider;
    }

    return handleRocketsOne(route);
  };

  it("should return a 200 response", async () => {
    const response = await handle({
      provider: "spacex",
      rocketId: "falcon9",
    });

    expect(response).toMatchSnapshot();
  });

  it("should return 404 provider not found", async () => {
    const response = await handle({
      provider: "nasa",
      rocketId: "falcon9",
    });

    expect(response).toMatchSnapshot();
  });

  it("should return a 404 rocket not found", async () => {
    const response = await handle({
      provider: "spacex",
      rocketId: "unknown",
    });

    expect(response).toMatchSnapshot();
  });

  it("should return a 400 missing provider", async () => {
    const response = await handle({
      rocketId: "falcon9",
    });

    expect(response).toMatchSnapshot();
  });

  it("should return a 400 missing rocketId", async () => {
    const response = await handle({
      provider: "spacex",
    });

    expect(response).toMatchSnapshot();
  });
});
