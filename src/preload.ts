import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('Champion', {
  ping: () => console.log(`Main is connected.`)
});
