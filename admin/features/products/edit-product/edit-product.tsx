"use client";

import { Category } from "@/features/categories/types";
import { Button, Form } from "@/features/ui";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  FormSection,
  ImagesUpload,
  ProductCategory,
  ProductFinal,
  ProductOverview,
} from "../form";
import { Product } from "../types";
import { useEditProduct } from "./use-edit-product";

interface EditProductProps {
  categories: Category[];
  product: Product;
}

export const EditProduct: React.FC<EditProductProps> = ({
  categories,
  product,
}) => {
  const {
    loading,
    form,
    handleSubmit,
    files,
    dropzoneState,
    tempImageIds,
    setTempImageIds,
  } = useEditProduct(product);
  const router = useRouter();

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file?.preview || ""));
  }, []);

  const onDeleteImage = (imageId: number) => {
    if (confirm("Do you want to delete this image?"))
      setTempImageIds(tempImageIds.filter((id) => id !== imageId));
  };

  const onCancel = () => {
    if (confirm("Do you want to discard the changes?"))
      router.replace("/products");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-12">
        <ProductOverview loading={loading} form={form} />
        <ProductCategory form={form} categories={categories} />
        <FormSection
          heading="Images"
          description="Upload some high-quality images of the product"
        >
          <ImagesUpload files={files} dropzoneState={dropzoneState} />
          <div className="relative col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4">
            {tempImageIds.map((imageId) => (
              <div className="relative">
                <Image
                  width={132}
                  height={132}
                  alt={product.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${imageId}`}
                  className="aspect-square h-auto w-full rounded object-cover"
                />
                <Button
                  type="button"
                  className="absolute right-3 top-3 h-8 w-8"
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteImage(imageId)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {files.map((file) => (
              <Image
                alt="Preview images"
                src={file?.preview || ""}
                width={0}
                height={0}
                className="aspect-square h-auto w-full rounded object-cover"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file?.preview || "");
                }}
              />
            ))}
          </div>
        </FormSection>
        <ProductFinal form={form} />
        <div className="mt-8 flex gap-x-4">
          <Button
            onClick={onCancel}
            disabled={loading}
            variant="secondary"
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
};
