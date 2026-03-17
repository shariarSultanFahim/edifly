import { decodeCardData } from "@/lib/storage";
import CardViewClient from "./CardViewClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const card = decodeCardData(id);
  const recipientName = card?.recipientName?.trim();
  const senderName = card?.senderName?.trim();

  const title = recipientName
    ? `A Beautiful Eid Greeting Card for ${recipientName} — Shared with Love`
    : "A Beautiful Shared Eid Greeting Card — Open and Celebrate";

  const description = senderName
    ? `Celebrate this blessed occasion with a heartfelt Eid message from ${senderName}. Open this card to view the full greeting and share the joy with your loved ones.`
    : "Celebrate this blessed occasion with a heartfelt Eid message. Open this card to view the full greeting and share the joy with your loved ones.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/card/${id}`,
      images: [
        {
          url: "https://eidifly.fa-m.dev/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "EidiFly Eid greeting card preview image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://eidifly.fa-m.dev/opengraph-image.png"],
    },
  };
}

export default async function CardViewPage({ params }) {
  const { id } = await params;
  return <CardViewClient id={id} />;
}
