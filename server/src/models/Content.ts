export interface ContentType {
    title: string,
    type: "blog" | "x" | "youtube" | "instagram" | "notion",
    url: string,
    tags: string[],
    userId: string
}