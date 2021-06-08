interface Message {
    recipient: string;
    sender: string;
    content: string;
}
interface User {
    name: string;
    email: string;
    connectionId: string
}

interface ReducerAction {
    type: string;
    payload: any;
}