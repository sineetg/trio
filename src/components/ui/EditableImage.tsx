import Image from "next/image";

type EditableImageProps = {
  src?: string;
  alt: string;
  placeholderLabel: string;
  className?: string;
};

export function EditableImage({ src, alt, placeholderLabel, className = "" }: EditableImageProps) {
  return (
    <div className={`editable-image ${className}`.trim()}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
      ) : (
        <div className="editable-image__placeholder" role="img" aria-label={placeholderLabel}>
          <span className="editable-image__label">{placeholderLabel}</span>
          <span className="editable-image__hint">Replace with approved imagery</span>
        </div>
      )}
    </div>
  );
}
