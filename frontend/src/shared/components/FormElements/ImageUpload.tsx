import React, { useRef, FC } from 'react';
import Button from './Button';

interface ImageUploadProps {
    id: string;
    center?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({id, center}) => {
    const filePickerRef = useRef<HTMLInputElement>(null);

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target);
    };

    const pickImageHandler = () => {
        filePickerRef.current?.click();
    };

    return (
        <div className="flex flex-col p-4  border-gray-300 rounded-lg">
            <input
                id={id}
                ref={filePickerRef}
                className="hidden"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`flex ${center ? 'justify-center items-center' : ''} flex-col`}>
                <div className="w-40 h-40 border border-gray-300 flex justify-center items-center text-center mb-5">
                    <img src="" alt="Preview" className="w-full h-full object-cover"/>
                </div>
                <Button type="button" onClick={pickImageHandler}>UPLOAD IMAGE</Button>
            </div>
        </div>
    );
};

export default ImageUpload;
