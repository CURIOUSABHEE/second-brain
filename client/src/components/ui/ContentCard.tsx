import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DeleteIcon from "../../icons/DeleteIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";

interface ContentCardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function ContentCard({ title, link, type }: ContentCardProps) {
  return (
    <Card className="w-72">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {type === "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        <button className="text-muted-foreground hover:text-destructive transition-colors">
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
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}

export default ContentCard;
