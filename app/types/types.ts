export type RootStackParamList = {
    Welcome:undefined;
    Login:undefined;
    Register:undefined;
    Home:undefined;
};

export type JournalEntry ={
    id: number;
    userId: number;
    title: string;
    content: string;
    category: string;
    date: string;
}