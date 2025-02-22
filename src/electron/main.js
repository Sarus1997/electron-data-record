const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: "#2e2c29",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    margin: 0,
    padding: 0,

  });

  mainWindow.loadURL('http://localhost:8080/login');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

