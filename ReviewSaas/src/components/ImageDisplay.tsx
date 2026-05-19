interface ImageItem {
  status: string;
  image: string;
}

interface Props {
  images: ImageItem[] | null;
}

export default function ImageDisplay({
  images,
}: Props) {

  if (!images || images.length === 0) {
    return null;
  }

  return (

    <div className="gallery">

      {images.map((item, index) => {

        const isBase64 =
          !item.image.startsWith("http");

        return (

          <div
            key={index}
            className="image-card"
          >

            <img
              src={
                isBase64
                  ? `data:image/png;base64,${item.image}`
                  : item.image
              }
              alt={`Generated ${index}`}
            />

          </div>
        );
      })}

    </div>
  );
}