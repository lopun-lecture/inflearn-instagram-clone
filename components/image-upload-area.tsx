"use client";

import Dropzone from "react-dropzone";
import * as storageActions from "actions/storage-actions";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { queryClient } from "config/ReactQueryClientProvider";

export default function ImageUploadArea() {
  const fileUploadMutation = useMutation({
    mutationFn: async (acceptedFiles: File[]) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const fileUploadResult = await storageActions.handleFileUploadForm(
        formData
      );
      return fileUploadResult;
    },
    onSuccess: (result) => {
      console.log(result);
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  return (
    <Dropzone
      onDrop={(acceptedFiles) => fileUploadMutation.mutate(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="w-full flex flex-col items-center justify-center p-20 border-4 border-dotted border-indigo-400 cursor-pointer">
          <div {...getRootProps()}>
            <input {...getInputProps()} multiple={false} />
            {fileUploadMutation.isPending ? (
              <Spinner color="indigo" className="h-10 w-10" />
            ) : (
              <p>파일을 끌어다 놓거나 클릭해서 파일을 업로드하세요.</p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
