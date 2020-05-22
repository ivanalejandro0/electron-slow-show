import { app, Menu, Tray } from "electron";
import * as path from "path";

export function createTray(browserWindow: Electron.BrowserWindow): Electron.Tray {
  const icon = path.join(__dirname, "../icon.png");
  const tray = new Tray(icon);

  const onQuit = (): void => {
    app.quit();
  };

  const handleShowWindow = (): void => {
    browserWindow.show();
  };

  const handleHideWindow = (): void => {
    browserWindow.hide();
  };

  const handleTrayClick = (_event: any): void => {
    if (browserWindow && browserWindow.isVisible()) {
      return browserWindow.hide();
    }

    browserWindow.show();
  };

  const trayMenu: Menu = Menu.buildFromTemplate([
    {label: "Show Window", type: "normal", click: handleShowWindow},
    {label: "Hide Window", type: "normal", click: handleHideWindow},
    {type: "separator"},
    {label: "Quit App", type: "normal", click: onQuit},
  ]);

  tray.setToolTip("Click to Open");
  tray.setContextMenu(trayMenu);

  tray.on("click", handleTrayClick);

  return tray;
}
