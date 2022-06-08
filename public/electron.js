const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const Menu = require('electron').Menu;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    win.webContents.openDevTools({ mode: 'detach' });
  }
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
// create and modify the menu bar
const menu = new Menu();
const menubar = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'New Project',
                accelerator: 'CmdOrCtrl+N',
                submenu: [
                    {
                        label: 'New Project from Blank',
                    },
                    {
                        label: 'New Project from Template',
                    }
                ],
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Y',
                role: 'redo',
            },
            {
                type: 'separator',
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Copy Track',
                accelerator: 'CmdOrCtrl+T',
                role: 'copy-track',
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall',
            },
            {type: 'separator'},
            {
                label: 'Go to plugin and effect library',
                accelerator: 'CmdOrCtrl+L',
            },
            {type: 'separator'},
            {
                label: 'Trim clip',
                accelerator: 'CmdOrCtrl+P',
                role: 'trim-clip',
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                role: 'preferences',
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Zoom track in',
                accelerator: 'CmdOrCtrl+Up',
                role: 'zoom-in',
            },
            {
                label: 'Zoom track out',
                accelerator: 'CmdOrCtrl+Down',
                role: 'zoom-out',
            },
            {
                type: 'separator',
            },
            // make a checkbox in the menu
            {
                label: 'Show track labels',
                type: 'checkbox',
                checked: true,
            },
            {
                label: 'Show beat markers',
                type: 'checkbox',
                checked: true,
            },
            {
                label: 'Piano roll',
                type: 'checkbox',
                checked: false,
            },
            {
                label: 'Composition area',
                type: 'checkbox',
                checked: true,
            },
            {
                label: 'Mixer',
                type: 'checkbox',
                checked: true,
            },
            {
                label: 'Project Library',
                type: 'checkbox',
                checked: true,
            }
        ]
    }
])
Menu.setApplicationMenu(menubar);