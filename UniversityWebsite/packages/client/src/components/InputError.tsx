type InputErrorProps = {
    id: string;
    message: string;
};

function InputError({ message, id }: InputErrorProps) {
    return (
        <small id={id} className="error-text">
            {message}
        </small>
    );
}

export default InputError;
