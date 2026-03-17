import { decodeCardData } from "@/lib/storage";
import CardViewClient from "./CardViewClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const card = decodeCardData(id);

  const title = card?.recipientName
    ? `Eid card for ${card.recipientName}`
    : "Shared Eid Greeting Card";

  const description = card?.senderName
    ? `A special Eid card from ${card.senderName}. Open to view the full greeting.`
    : "A special Eid card has been shared with you. Open to view the full greeting.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Shared Eid greeting card preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CardViewPage({ params }) {
  const { id } = await params;
  return <CardViewClient id={id} />;
}
