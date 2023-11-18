import prisma from "@/lib/prisma";

import BillboardForm from "@/components/form/billboard-form";

const BillboardByIDPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  // const store = {
  //   id: "dsds",
  //   name: "Shoe store",
  //   userId: "sdksdsl",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  });

  return (
    <div className="p-4 px-6">
      <BillboardForm initialData={billboard} />
    </div>
  );
};

export default BillboardByIDPage;
