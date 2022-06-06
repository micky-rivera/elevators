export {};

declare global {
    type Call = {
        origin: number,
        destination: number,
        direction: string
    };

    interface FormProps {
        callsList: Call[],
        setCallsList: React.Dispatch<React.SetStateAction<Call[]>>,
        env: {}
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
        callsList: Call[],
        numberOfElevatorsInput: string,
        env: {},
        setEnv: React.Dispatch<React.SetStateAction<{}>>
    };
};