export default function middleware(req) {
  const url = req.nextUrl;

  if (!url.pathname.includes(".")) {
    url.pathname = "/";
    return Response.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
