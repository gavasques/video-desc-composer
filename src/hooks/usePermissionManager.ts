
import { useState } from 'react';
import { PermissionScope } from '@/types/settings';

export const usePermissionManager = () => {
  const [permissions, setPermissions] = useState<PermissionScope[]>([
    {
      scope: 'youtube.readonly',
      description: 'Visualizar informações do canal',
      isActive: true
    },
    {
      scope: 'youtube',
      description: 'Gerenciar vídeos e metadados',
      isActive: true
    },
    {
      scope: 'youtube.upload',
      description: 'Fazer upload de vídeos',
      isActive: true
    }
  ]);

  const getScopeDescription = (scope: string) => {
    const permission = permissions.find(p => p.scope === scope);
    return permission?.description || scope;
  };

  return { permissions, getScopeDescription };
};
