import * as React from "react";
import {Link} from "react-router-dom";
import {Star} from "lucide-react";

type CardProps = {
    key: number;
    imageUrl: string;
    alt: string;
    rating?: number;
    content: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

type CardLinkProps = CardProps & {
    linkTo: string,
}

export const Card = ({key, imageUrl, alt, rating, content, className, onClick}: CardProps) => {
    return (
        <div onClick={onClick} key={key} className={`${className}`}>
            <div className="h-48 bg-gray-200 relative">
                <img
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
                {rating && (
                    <div
                        className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-xl flex items-center text-sm">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" strokeWidth={0} fill="currentColor"
                              aria-hidden="true"/>
                        <span className="text-md font-medium font-[Figtree]">{rating}</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                {content}
            </div>
        </div>

    )
}

export const CardLink = ({linkTo, key, imageUrl, alt, content}: CardLinkProps) => {
    return (
        <Link
            to={linkTo}
            key={key}
            className="rounded-lg overflow-hidden shadow-md block transition-transform hover:scale-[1.02]"

        >
            <Card key={key} imageUrl={imageUrl} alt={alt} content={content}/>
        </Link>
    )
}
