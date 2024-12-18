import App from "./App";
import AppBuilder from "./builds/AppBuilder";

export const bootstrap = (callback: (app: App) => void) => {
  const builder = AppBuilder.instance()

  const app = builder.createApp()

  builder.loadConfigProvider()

  callback(app)

  builder.build()
};
