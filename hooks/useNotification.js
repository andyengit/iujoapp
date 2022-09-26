import {useContext} from 'react';
import {notificationContext} from '../context/NotificationProvider';

export default function useNotification() {
  return useContext(notificationContext);
}

