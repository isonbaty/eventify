import Image from 'next/image';

function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <section className='h-[500px] md:h-[700px] relative mt-8'>
      <Image
        src={mainImage}
        fill
        sizes='100vw'
        alt={name}
        className='lg:object-contain md:object-cover object-cover'
        priority
      />
    </section>
  );
}
export default ImageContainer;
