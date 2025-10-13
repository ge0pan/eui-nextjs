import { useRouter } from "next/navigation";

export function useGetLinkProps() {
  const router = useRouter();

  return (href: string) => ({
    href,
    onClick: (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey) {
        // Default behavior for opening in a new tab
        return;
      }

      e.preventDefault();

      router.push(href);
    },
  });
}
