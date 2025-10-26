import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.procrastinaide.app',     
  appName: 'ProcrastinAide',
  webDir: 'build',
  server: { androidScheme: 'https' }    
};

export default config;
