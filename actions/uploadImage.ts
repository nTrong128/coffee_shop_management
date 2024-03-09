import {useEdgeStore} from "@/lib/edgestore";

export async function UploadImage({productImg}: {productImg: File}) {
  const {edgestore} = useEdgeStore();

  const res = await edgestore.publicFiles.upload({
    file: productImg,
  });
  return res.url;
}
