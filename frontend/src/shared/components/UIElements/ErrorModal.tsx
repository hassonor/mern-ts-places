import { FC, useRef, useEffect } from 'react';
import Modal, { ModalHandles } from './Modal';
import Button from '../FormElements/Button';

interface ErrorModalProps {
    error: string | null;
    onClear: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({error, onClear}) => {
    const modalRef = useRef<ModalHandles>(null);

    useEffect(() => {
        if (error) {
            modalRef.current?.open();
        } else {
            modalRef.current?.close();
        }
    }, [error]);

    return (
        <Modal
            ref={modalRef}
            title={<h2 className="font-extrabold text-lg">An Error Occurred! </h2>}
            footer={<Button onClick={onClear}>Okay</Button>}
            style={{width: '80%', maxWidth: '600px'}}
        >
            <p className=" m-2 font-extrabold text-lg">{error}</p>
        </Modal>
    );
};

export default ErrorModal;
