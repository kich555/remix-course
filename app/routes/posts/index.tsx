import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  return json<LoaderData>({ posts });
};

export default function PostRoute() {
  const { posts } = useLoaderData() as LoaderData;
  const items = posts.map((post) => (
    <li key={post.slug}>
      <Link
        to={post.slug}
        prefetch="intent"
        className="text-blue-600 underline"
      >
        {post.title}
      </Link>
    </li>
  ));

  return (
    <main>
      <h1>Posts</h1>
      <ul>{items}</ul>
    </main>
  );
}
