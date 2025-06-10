type ImageBlackBackgroundProps = {
    key: number,
    imageUrl: string,
    alt: string,
    text: string,
}

const ImageBlackBackground = ({key, imageUrl, alt, text}: ImageBlackBackgroundProps) => {
    return (
        <div key={key} className="relative rounded-lg overflow-hidden flex-shrink-0 group">
            <img
                src={imageUrl}
                alt={alt}
                className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] aspect-[5/7] object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
            />
            <div
                className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                {text}
            </div>
        </div>
    )
}

export default ImageBlackBackground
