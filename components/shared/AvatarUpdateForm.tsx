"use client";

import {
  SingleImageDropzone,
  type FileState,
} from "@/components/ui/SingleImageDropzone";
import {useEdgeStore} from "@/lib/edgestore";
import React, {useState} from "react";
import {UpdateUserImage} from "@/actions/updateUserAvatar";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";

export default function UpdateAvatar({
  username,
  oldImageUrl,
}: {
  username: string;
  oldImageUrl: string;
}) {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const {edgestore} = useEdgeStore();
  return (
    <div className="flex items-center flex-col mt-4">
      <SingleImageDropzone
        height={400}
        width={450}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <Progress indicatorColor="bg-green-600" value={progress} />
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-4">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{width: `${progress}%`}}>
            {" "}
            {progress}%
          </div>
        </div>
      )}
      {progress > 0 && file && imageUrl ? (
        ""
      ) : (
        <Button
          hidden={progress > 0 && progress < 100}
          className="w-2/3 mt-2 bg-green-700 hover:bg-green-900"
          onClick={async () => {
            if (file) {
              if (oldImageUrl) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  options: {
                    replaceTargetUrl: oldImageUrl,
                  },
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                const status = await UpdateUserImage(username, res?.url);
                if (status.error) {
                  await edgestore.publicFiles.delete({url: res?.url});
                }
                setImageUrl(res?.url);
              } else {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                const status = await UpdateUserImage(username, res?.url);
                if (status.error) {
                  await edgestore.publicFiles.delete({url: res?.url});
                }
                setImageUrl(res?.url);
              }
            }
          }}>
          Tải ảnh lên
        </Button>
      )}
    </div>
  );
}
