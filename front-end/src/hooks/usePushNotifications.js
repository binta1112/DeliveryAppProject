import { useEffect, useState, useRef, use } from 'react';
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export function usePushNotifications() {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    // Configuration du comportement des notifications
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
    }, []);

    useEffect(() => {
        // Demande de permission + récupération du token
        async function registerForPushNotificationsAsync() {
            // Android : channel obligatoir
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                });
            }
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                console.log("Permission push refusée !");
                return;
            }
            const tokenData = await Notifications.getExpoPushTokenAsync();
            console.log("Expo Push Token:", tokenData.data);
            setExpoPushToken(tokenData.data);
        }
        registerForPushNotificationsAsync();
        

        //Listener : notification reçue (foreground)
        notificationListener.current = Notifications.addNotificationsReceivedListener(
            (notification) => {
                console.log("Notification reçue :", notification);
            }
        );

        //Listener : interaction utilisateur
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log("Notification cliquée:", response);
            }
        );

        //Cleanup
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);


}