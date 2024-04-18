"use client";

import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import * as storageActions from "actions/storage-actions";
import { queryClient } from "config/ReactQueryClientProvider";

const getImageUrl = (imageName: string) =>
  encodeURI(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public_images/${imageName}`
  );

export default function ImageCard({ image: { id, name } }) {
  const deleteImageMutation = useMutation({
    mutationFn: () => storageActions.deleteImage(name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  return (
    <Card className="w-full shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          className="aspect-square w-full"
          src={getImageUrl(name)}
          alt="ui/ux review check"
        />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
          onClick={() => deleteImageMutation.mutate()}
          disabled={deleteImageMutation.isPending}
        >
          <i className="fas fa-trash text-lg"></i>
        </IconButton>
      </CardHeader>
      <CardBody className="overflow-x-hidden">
        <span className="text-sm text-nowrap">{name}</span>
      </CardBody>
    </Card>
  );
}
