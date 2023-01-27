import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import './src/lib/dayjs';
import { Routes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true
  })
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  async function scheduleNotification() {
    const trigger = new Date(Date.now())
    trigger.setMinutes(trigger.getMinutes() + 1)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Olá Jean! 😎',
        body: 'Você praticou seus hábitos hoje?'
      },
      trigger
    })
  }

  async function getScheduleotification() {
    const schedules = await Notifications.getAllScheduledNotificationsAsync()
    console.log(schedules);
  }

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {/* <Button title='Enviar notificação' onPress={scheduleNotification} /> */}
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
