export type RootStackParamList = {
    Welcome:undefined;
    Login:undefined;
    Register:undefined;
    HomeTab:undefined;
};

export type JournalEntry ={
    id: number;
    userId: number;
    title: string;
    content: string;
    category: string;
    date: string;
}