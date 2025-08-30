import ThreeDotsFade from "../svg/ThreeDotsFade";

type LoadingSpinnerProps = {
    message: string;
};

function LoadingSpinner({ message }: LoadingSpinnerProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <ThreeDotsFade />
            <p style={{ textAlign: "center" }}>{message}</p>
        </div>
    );
}

export default LoadingSpinner;
