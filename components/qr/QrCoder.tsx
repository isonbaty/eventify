'use client';
import { useQRCode } from 'next-qrcode';

function QrCoder({ url }: { url: string }) {
  const { Canvas } = useQRCode();

  return (
    <div className='flex'>
      <Canvas
        text={url}
        options={{
          errorCorrectionLevel: 'H',
          margin: 1,
          scale: 4,
          width: 300,
          color: {
            dark: '#000000ff',
            light: '#ffffffff',
          },
        }}
      />
    </div>
  );
}
export default QrCoder;
