import { OpenAPIV3 } from "openapi-types";
export const openApiSpec = {
  "openapi": "3.0.3",
  "info": {
    "title": "SpaceX",
    "version": "3.0.0"
  },
  "servers": [
    {
      "url": "https://api.spacexdata.com/v3"
    }
  ],
  "externalDocs": {
    "description": "SpaceX API Docs",
    "url": "https://docs.spacexdata.com/"
  },
  "paths": {
    "/rockets/{rocketId}": {
      "get": {
        "operationId": "RocketsOne",
        "parameters": [
          {
            "name": "rocketId",
            "in": "path",
            "schema": {
              "type": "string"
            },
            "required": true,
            "example": "falcon9"
          }
        ],
        "responses": {
          "200": {
            "description": "Get a rocket",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "id",
                    "company",
                    "country",
                    "flickr_images",
                    "cost_per_launch"
                  ],
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "company": {
                      "type": "string"
                    },
                    "country": {
                      "type": "string"
                    },
                    "flickr_images": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "cost_per_launch": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Rocket not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "RocketOneResponse": {
        "type": "object",
        "required": [
          "id",
          "company",
          "country",
          "flickr_images",
          "cost_per_launch"
        ],
        "properties": {
          "id": {
            "type": "number"
          },
          "company": {
            "type": "string"
          },
          "country": {
            "type": "string"
          },
          "flickr_images": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "cost_per_launch": {
            "type": "number"
          }
        }
      }
    }
  }
} satisfies OpenAPIV3.Document;