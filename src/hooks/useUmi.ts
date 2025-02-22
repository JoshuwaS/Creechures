import { useContext } from 'react';
import { UmiContext } from '../providers/UmiProvider';

export const useUmi = () => {
  const umi = useContext(UmiContext);
  if (!umi) throw new Error('useUmi must be used within UmiProvider');
  return umi;
}; 