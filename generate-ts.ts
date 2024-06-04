import fs from "node:fs";
import openapiTS from "openapi-typescript";
import { getOpenApiSpec } from "utils/openApi";
import chalk from "chalk";
import chokidar from "chokidar";

function saveFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, content);
  const time = new Date().toTimeString().substring(0, 8);
  console.log(chalk`{dim ${time}} {green Generated file:} {blue ${filePath}}`);
}

async function generateTs(ymlFilePath: string) {
  // check if the file exists
  if (!fs.existsSync(ymlFilePath)) {
    console.log(chalk.red(`Error: ${ymlFilePath} does not exist or is not accessible`));
    return;
  }
  const spec = await getOpenApiSpec(ymlFilePath);
  if (!spec) {
    console.log(chalk.red(`Error: ${ymlFilePath} is not a valid OpenAPI spec`));
    return;
  }

  // Generate typescript types from the OpenAPI spec
  const typesTs = ymlFilePath.replace(/spec.yml$/, "types.ts");
  saveFile(typesTs, await openapiTS(ymlFilePath));


  // Generate a typescript file that exports the OpenAPI spec
  const openApiSpecTs = ymlFilePath.replace(/spec.yml$/, "openApiSpec.ts");
  saveFile(openApiSpecTs, [
    `import { OpenAPIV3 } from "openapi-types";`,
    `export const openApiSpec = ${JSON.stringify(spec, null, 2)} satisfies OpenAPIV3.Document;`,
  ].join("\n"));
}

if (0) {
  void generateTs("src/services/spacex/spec.yml");
}

// Watch spec files under src/services and generate typescript files
chokidar.watch("src/services/**/spec.yml").on("all", (eventName, path) => {
  console.log(`Event: ${eventName} on ${path}`);
  if (["add", "change"].includes(eventName)) {
    void generateTs(path);
  }
});
