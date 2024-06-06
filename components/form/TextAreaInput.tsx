import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || tempDefaultDescription}
        rows={5}
        className='leading-loose'
        required
      />
    </div>
  );
}
const tempDefaultDescription =
  'Join us for the Annual Innovation Summit 2024, a premier event that brings together industry leaders, visionary thinkers, and innovative professionals from around the globe. This three-day event is designed to inspire, educate, and connect individuals passionate about driving innovation and shaping the future.';

export default TextAreaInput;
