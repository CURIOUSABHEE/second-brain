import DeleteIcon from "../../icons/DeleteIcon";
import ShareIcon from "../../icons/ShareIcon";

export interface CardProps {
  title: string;
  type: string;
  link: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="p-4 shadow-md rounded-2xl max-w-72 border border-slate-200 font-normal min-h-36">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center font-lg">
          <div className="text-gray-500 flex">
            <ShareIcon size="md" />
          </div>
          <h1>{props.title}</h1>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <a href={props.link}>
            <ShareIcon size="md" />
          </a>
          <DeleteIcon />
        </div>
      </div>

      <div className="p-2">
        {props.type === "youtube" && (
          <iframe
            className="w-full"
            src={props.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {props.type == "X" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;
