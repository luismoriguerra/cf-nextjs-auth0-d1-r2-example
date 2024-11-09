'use client'
import UserClient from "@/components/auth/user-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useRef, useState } from "react";


export default function Upload() {

    const [file, setFile] = useState<File | undefined>();
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [preview, setPreview] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const uploadedFile = event.target.files?.[0];
            setFile(uploadedFile);
            let reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(uploadedFile);
        }
        setMessage("");
    };

    const handleWorkerApiSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            setUploading(true);
            setMessage("Uploading...");
            const formData = new FormData();
            formData.append("file", file);

            const fileName = `${Date.now()}-${file.name}`;
            const fileNameWithoutSpaces = fileName.replace(/\s+/g, '-');

            try {
                const res = await fetch(
                    `/api/images?filename=${fileNameWithoutSpaces}`,
                    {
                        method: "PUT",
                        body: formData,
                    }
                );

                const result = (await res.json()) as {
                    status: string;
                    url: string;
                };
                result.status === "success"
                    ? setMessage("File Upload Successful")
                    : setMessage("File Upload Failed");
                setUrl(result.url);
                setPreview(null);
                setFile(undefined);
            } catch (error) {
                setMessage("An error occured");
            } finally {
                setUploading(false);
            }
        } else {
            setMessage("Please select a file");
        }
    };


    return (
        <div>
            <form>
                <div className="flex justify-center items-center h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6">
                    <label
                        className="cursor-pointer flex flex-col items-center justify-center space-y-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        htmlFor="image-upload"
                    >
                        <UploadIcon className="w-8 h-8" />
                        <span>Drag and drop or click to upload</span>
                    </label>
                    <input
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                {preview && (
                    <div className="bg-white dark:bg-gray-800 shadow-md mt-4 mb-4">
                        <img
                            src={preview}
                            alt="Uploaded Image"
                            width={100}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                )}
                <div className="flex justify-between">
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleWorkerApiSubmit(e as any);
                        }}
                    >
                        Upload with Workers API
                    </Button>
                </div>
            </form>
            <div>
                {url && (
                    <div>
                        <div>
                            <a href={url} target="_blank">
                                View Uploaded Image
                            </a>
                        </div>
                        <div className="thumbnail">
                            <img src={url} alt="Uploaded Image" width={100} height={100} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
