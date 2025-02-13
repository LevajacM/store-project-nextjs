import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ImageInput = () => {
  const name = "image";

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {name}
      </Label>
      <Input
        id={name}
        type='file'
        name={name}
        required
        accept='image/*'
        className='hover:cursor-pointer'
      />
    </div>
  );
};

export default ImageInput;
