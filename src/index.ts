import { $log, PlatformBuilder } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";

async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();

    process
      .on("SIGINT", () => gracefulClose(platform, "SIGINT"))
      .on("SIGHUP", () => gracefulClose(platform, "SIGHUP"))
      .on("SIGTERM", () => gracefulClose(platform, "SIGTERM"));
  } catch (error) {
    $log.error({
      event: "SERVER_BOOTSTRAP_ERROR",
      message: error.message,
      stack: error.stack
    });
  }
}

function gracefulClose(platform: PlatformBuilder, signal: string) {
  $log.warn(`\n\n${signal} received, closing gracefully.\n`);
  platform.stop();
  process.exit();
}

bootstrap();
