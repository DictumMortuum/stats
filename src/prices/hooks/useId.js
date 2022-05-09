import { useLocation } from 'react-router-dom';

export const useId = () => {
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3]);
  return id
}
