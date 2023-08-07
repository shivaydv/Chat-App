// export const host = "http://localhost:5000";
export const host = "https://chat-app-backend-yzxr.onrender.com";

export const registerRoute=`${host}/api/auth/register`;
export const loginRoute=`${host}/api/auth/login`;
export const allUser=`${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;