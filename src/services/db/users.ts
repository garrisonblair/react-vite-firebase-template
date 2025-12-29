import { User, UserInfo } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useAsync } from "react-use";
import { db } from "../../firebase";
import { useUserStore } from "../zustand/user.hooks";
import { BareUserData } from "./types";

export const useStoreUserInfo = () => {
  return async (user: UserInfo): Promise<BareUserData> => {
    const userData: BareUserData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      uid: user.uid,
    };

    await setDoc(doc(collection(db, "users"), user.uid), userData);

    return userData;
  };
};

export const useGetUserInfo = () => {
  return async (id: User["uid"]): Promise<BareUserData> => {
    const snapshot = await getDoc(doc(db, "users", id));
    return snapshot.data() as BareUserData;
  };
};

export const useGetUsers = () => {
  const user = useUserStore((state) => state.user);

  return useAsync(async () => {
    if (!user) {
      return [];
    }

    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "!=", user.email));

    const users: BareUserData[] = [];

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      users.push(doc.data() as BareUserData);
    });

    return users;
  });
};
