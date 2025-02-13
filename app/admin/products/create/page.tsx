import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import { createProductAction } from "@/utils/actions";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { SubmitBtn } from "@/components/form/Buttons";

const CreateProductPage = () => {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProductAction}>
          <div className='grid md:grid-cols-2 gap-4 my-4'>
            <FormInput
              name='name'
              type='text'
              label='product name'
              defaultValue={name}
            />
            <FormInput name='company' type='text' defaultValue={company} />

            <PriceInput />
            <ImageInput />
          </div>

          <TextAreaInput
            name='description'
            labelText='product description'
            defaultValue={description}
          />
          <div className='my-6'>
            <CheckboxInput name='featured' label='featured' />
          </div>

          <SubmitBtn text='Create Product' text2='Adding product...' />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProductPage;
