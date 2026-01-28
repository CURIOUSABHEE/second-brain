export interface ContentType {
    title: string,
    type: "blog" | "twitter" | "youtube" | "instagram" | "notion",
    url: string,
    tags: string[],
    userId: string
}