
import { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';
import { Badge } from '@/components/ui/badge';

const MobileInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<{
    platform?: string;
    isVirtual?: boolean;
    model?: string;
    osVersion?: string;
  }>({});
  
  useEffect(() => {
    async function getDeviceInfo() {
      try {
        const info = await Device.getInfo();
        setDeviceInfo({
          platform: info.platform,
          isVirtual: info.isVirtual,
          model: info.model,
          osVersion: info.osVersion
        });
      } catch (error) {
        console.error('Error getting device info:', error);
      }
    }
    
    getDeviceInfo();
  }, []);

  if (!deviceInfo.platform) return null;
  
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {deviceInfo.platform && (
        <Badge variant="outline" className="bg-islamic-green/10 border-islamic-green/20">
          {deviceInfo.platform}
        </Badge>
      )}
      {deviceInfo.model && (
        <Badge variant="outline">
          {deviceInfo.model}
        </Badge>
      )}
      {deviceInfo.osVersion && (
        <Badge variant="outline">
          OS {deviceInfo.osVersion}
        </Badge>
      )}
      {deviceInfo.isVirtual !== undefined && (
        <Badge variant="outline" className={deviceInfo.isVirtual ? "bg-amber-100" : "bg-green-100"}>
          {deviceInfo.isVirtual ? "Emulator" : "Real Device"}
        </Badge>
      )}
    </div>
  );
};

export default MobileInfo;
