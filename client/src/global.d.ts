export {};

declare global {
    type Call = {
        origin: number,
        destination: number,
        direction: string
    };

    interface FormProps {
        callsList: Call[],
        setCallsList: React.Dispatch<React.SetStateAction<Call[]>>
    };
    
    interface CallsListProps {
        callsList: Call[],
        setCallsList: React.Dispatch<React.SetStateAction<Call[]>>
    };
    
};