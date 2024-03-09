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
    <Button
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
  );
}
