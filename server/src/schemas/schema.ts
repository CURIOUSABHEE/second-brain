import mongoose, { Schema } from "mongoose";
import type { UserType } from "../models/User.js";
import type { TagsType } from "../models/Tags.js";
import type { LinkType } from "../models/Link.js";
import type { ContentType } from "../models/Content.js";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const ContentValues = ['image', 'video', 'blog'];

const contentSchema = new Schema({
    type: { type: String, enum: ContentValues, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true },
})


export const User = mongoose.model<UserType>("User", userSchema);
export const Tags = mongoose.model<TagsType>("Tag", tagSchema);
export const Link = mongoose.model<LinkType>("Link", linkSchema);
export const Content = mongoose.model<ContentType>("Content", contentSchema);
