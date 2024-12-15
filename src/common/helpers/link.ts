export function getS3Link(link?: string) {
  if (!link) return undefined;
  if (link)
    return `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${
      link.startsWith("/") ? link.substring(1) : link
    }`;
}
