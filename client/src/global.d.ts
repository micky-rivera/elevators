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
    
    interface ElevatorFormProps {
        numberOfElevatorsInput: string,
        setNumberOfElevatorsInput: React.Dispatch<React.SetStateAction<string>>
    };

    interface CanvasProps {
        numberOfElevatorsInput: string
    };
};