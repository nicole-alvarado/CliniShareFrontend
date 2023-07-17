const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const patToIcon = "./documentación/imagenes/caduceoBlanco.png";

app.commandLine.appendSwitch("ignore-certificate-errors");

const createWindow = () => {
  const win = new BrowserWindow({ show: false});
  win.maximize();
  win.setIcon(patToIcon);
  win.show();

  win.loadURL("https://localhost:5000");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
