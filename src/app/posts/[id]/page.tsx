import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }
const authorPosts = await prisma.post.findMany({
  where: { authorId: post.authorId },
 
});
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">My first post</h1>
        <p className="text-gray-600 text-center">by Anonymous</p>
        <div className="prose prose-gray mt-8">
          No content available.
        </div>
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
        <p className="text-gray-600 text-center">by {post.author.name}</p>
        <div className="prose prose-gray mt-8">
          {post.content || "No content available."}
        </div>
      </article>

      <div>
        related posts
        <div className="grid grid-cols-3 gap-4">
         {authorPosts.map((post)=>(

          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="p-4  bg-amber-200">
            <h3 className="font-bold text-xl text-red-600">{post.title}</h3>
            <p>{post.content}</p>
          </div>
            </Link>
        
        )).filter(p=> p.key !== id)
        }
        </div>
      </div>
    </div>
  );
}