import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import {
  editProductAction,
  editProductImageAction,
  fetchAdminProductDetails,
} from "@/utils/actions";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitBtn } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const ProductEditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const { name, company, price, description, featured } = product;

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className='border p-8 rounded-md'>
        {/* IMAGE INPUT CONTAINER */}
        <ImageInputContainer
          image={product.image}
          name={name}
          action={editProductImageAction}
          text='Replace image'
        >
          <input type='hidden' name='id' value={id} />
          <input type='hidden' name='url' value={product.image} />
        </ImageInputContainer>

        <FormContainer action={editProductAction}>
          <div className='grid md:grid-cols-2 gap-4 my-4'>
            <input type='hidden' name='id' value={id} />
            <FormInput
              name='name'
              type='text'
              label='product name'
              defaultValue={name}
            />
            <FormInput name='company' type='text' defaultValue={company} />

            <PriceInput defaultValue={price} />
          </div>

          <TextAreaInput
            name='description'
            labelText='product description'
            defaultValue={description}
          />
          <div className='my-6'>
            <CheckboxInput
              name='featured'
              label='featured'
              defaultChecked={featured}
            />
          </div>

          <SubmitBtn text='Edit Product' text2='Updating product...' />
        </FormContainer>
      </div>
    </section>
  );
};

export default ProductEditPage;
