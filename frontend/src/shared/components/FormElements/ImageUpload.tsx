import React, { FC, useState, useRef } from 'react';
import Button from './Button';

interface ImageUploadProps {
    id: string,
    center?: boolean,
    onInput: (id: string, fileBase64: string | null, isValid: boolean) => void,
}

const ImageUpload: FC<ImageUploadProps> = ({id, center, onInput}) => {
    const [base64File, setBase64File] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const filePickerRef = useRef<HTMLInputElement>(null);

    const convertToBase64 = (file: File) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const base64String = fileReader.result as string;
            setPreviewUrl(base64String);
            setBase64File(base64String);  // Update base64File state
            setIsValid(true);
            onInput(id, base64String, true);
        };
        fileReader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
            setIsValid(false);
            onInput(id, null, false);
        };
        fileReader.readAsDataURL(file);
    };

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length === 1) {
            const pickedFile = event.target.files[0];
            convertToBase64(pickedFile);
        } else {
            if (isValid) {
                setIsValid(false);
                onInput(id, null, false);
            }
        }
    };

    const pickImageHandler = () => {
        filePickerRef.current?.click();
    };

    return (
        <div className={`flex flex-col p-4 border-gray-300 rounded-lg ${center ? 'items-center' : ''}`}>
            <input
                id={id}
                ref={filePickerRef}
                className="hidden"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className="w-40 h-40 border border-gray-300 flex justify-center items-center text-center mb-5">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover"/>
                ) : (
                    <p>No image selected</p>
                )}
            </div>
            <input
                name="base64File"
                value={base64File || ''}
                hidden
                readOnly
            />
            <Button type="button" onClick={pickImageHandler}>UPLOAD IMAGE</Button>
            {isValid === false && (
                <p className="text-red-500">Please pick a valid image</p>
            )}
        </div>
    );
};

export default ImageUpload;
