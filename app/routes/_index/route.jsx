import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"; 
import Index from "../app._index"; 
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    return redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({ showIndex: true });
};

export default function App() {
  const { showIndex } = useLoaderData(); 

  return (
    <div>
      {showIndex && <Index />}
    </div>
  );
}
