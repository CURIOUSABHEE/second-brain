import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DeleteIcon from "../../icons/DeleteIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";

interface ContentCardProps {
  contentId: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: (id: string) => void;
}

export function ContentCard({
  contentId,
  title,
  link,
  type,
  onDelete,
}: ContentCardProps) {
  return (
    <Card className="w-72 h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          {type === "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
          <CardTitle className="text-sm font-medium truncate">
            {title}
          </CardTitle>
        </div>
        <button
          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
          onClick={() => onDelete(contentId)}
        >
          <DeleteIcon />
        </button>
      </CardHeader>
      <CardContent>
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md"
            src={link.replace("watch?v=", "embed/")}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {type === "twitter" && (
          <div className="max-h-80 overflow-hidden rounded-md">
            <blockquote className="twitter-tweet" data-conversation="none">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ContentCard;
